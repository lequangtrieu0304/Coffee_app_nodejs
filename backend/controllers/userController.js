import User from "../models/userModel";
import bcrypt from 'bcrypt';

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
            return res.status(200).json({
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
        return res.status(400).json({
            message: "Bạn cần điền đủ các trường",
        })
    }
    try {
        const findUser = await User.findOne({email});
        if(findUser){
            const result = await bcrypt.compare(password, findUser.password);
            if(result){
                const token = accessToken(findUser);
                res.cookie('accessToken', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });

                return res.json({
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
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            })
        }
        return res.status(400).json({
            message: "Email không đúng",
        })
    }
    catch(err){
        console.log(err);
    }
}

const handleLogout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies || !cookies.accessToken) {
            return res.status(400).json({
                message: "INVALID TOKEN",
            });
        } else {
            res.clearCookie('accessToken', { httpOnly: true })
                .status(200)
                .end();
        }
    } catch (err) {
        console.log(err);
    }
};


const handleRegister = async (req, res) => {
    const { username, email, password, phone, birthday } = req.body;
        try {
            if (!username || !email || !password) {
                return res.status(400).json({
                    message: 'Bạn cần điền đủ các trường',
                });
            }
            const [checkName, checkEmail] = await Promise.all([
                User.findOne({ username }),
                User.findOne({ email }),
            ]);
            if (checkName) {
                return res.status(400).json({
                    message: 'Tên đã được sử dụng',
                });
            }
            if (checkEmail) {
                return res.status(400).json({
                    message: 'Email đã được sử dụng',
                });
            }
            const hashpwd = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashpwd,
                phone,
                birthday,
                image: 'images/270_crop_BANHCHUOI.jpg',
                sex: 'diff',
                address: '',
            });
            const createUser = await newUser.save();
            if (createUser) {
                return res.json({
                    message: 'Đăng kí thành công',
                    data: createUser,
                });
            }
            return res.status(400).json({
                message: 'Đăng kí thất bại',
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Đã có lỗi xảy ra',
    });
}}

const handleUpdate = async (req, res) => {
    const update = req.body;
    try {
        const user = await User.
            findOneAndUpdate({
                _id: req.params.id}, 
                update, 
                { new: true }
            );
        if(user){
            const token = accessToken(user)
            res.cookie('accessToken', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 1000,
            })
            return res.json({
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
            })
        }
        return res.status(400).json({
            message: "Cập nhật thất bại"
        })
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
    handleLogout
}