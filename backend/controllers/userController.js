import User from "../models/userModel";
import brcypt from 'bcrypt';

import { accessToken } from "../middleware/tokenAccess";

const createdAdminAccount = async (req, res) => {
    try{
        const hashpwd = await brcypt.hash('anhtrieu', 10);
        const admin = {
            username: 'quangtrieu',
            email: 'quangtrieu01@gmail.com',
            password: hashpwd,
            isAdmin: true,
        }
        const adminAccount = await User.create(admin);
        if(adminAccount){
            res.status(200).send({
                message: 'Tao thanh cong',
                result: adminAccount,
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).send({
            message: "Bạn cần điền đủ các trường",
        })
    }
    try {
        const findUser = await User.findOne({email});
        if(findUser){
            const result = await brcypt.compare(password, findUser.password);
            if(result){
                const token = accessToken(findUser);

                res.cookie('accessToken', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.send({
                    id: findUser._id,
                    username: findUser.username,
                    email: findUser.email,
                    phone: findUser.phone,
                    birthday: findUser.birthday,
                    sex: findUser.sex,
                    address: findUser.address,
                    image: findUser.image,
                    isAdmin: findUser.isAdmin,
                });
            }
            else {
                res.status(400).send({
                    message: "Mật khẩu không đúng",
                })
            }
        }
        else {
            res.status(400).send({
                message: "Email không đúng",
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

const handleRegister = async (req, res) => {
    const { username, email, password, phone, birthday } = req.body;
 
    try {
        if(!username || !email || !password) {
            return res.status(400).json({
                message: 'Bạn cần điền đủ các trường'
            })
        }
        const checkName = await User.findOne({username});
        const checkEmail = await User.findOne({email});
        if(checkName) {
            res.status(400).send({
                message: 'Tên đã được sử dụng',
            })
        }
        else if(checkEmail) {
            res.status(400).send({
                message: 'Email đã được sử dụng',
            })
        }
        else {
            const hashpwd = await brcypt.hash(password, 10);
            const newUser = new User({
                username, 
                email, 
                password: hashpwd, 
                phone, 
                birthday, 
                image: 'images/270_crop_BANHCHUOI.jpg', 
                sex: 'diff', 
                address: '',
            })
            const createUser = await newUser.save();
            if(createUser){
                res.send({
                    message: "Đăng kí thành công",
                    data: createUser,
                })
            }
            else {
                res.status(400).send({
                    message: 'Đăng kí thất bại',
                })
            }
        }
    }
    catch (err){
        console.log(err);
    }
}

const handleUpdate = async (req, res) => {
    const update = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate({_id: req.params.id}, update, {
            new: true,
        })
        const user = await updateUser.save();
        if(user){
            res.send({
                message: 'Đã cập nhật',
                id: user._id,
                username: user.username,
                phone: user.phone,
                email: user.email,
                address: user.address,
                birthday: user.birthday,
                sex: user.sex,
                isAdmin: user.isAdmin,
                image: user.image,
                token: accessToken(user),
            })
        }
        else {
            res.status(400).send({
                message: "Cập nhật thất bại"
            })
        }
    }
    catch (err){
        console.log(err);
    }
}

export default {
    createdAdminAccount,
    handleLogin,
    handleRegister,
    handleUpdate,
}