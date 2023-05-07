import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import CustomError from "../Errors/index.js";

import { accessToken } from "../middleware/tokenAccess.js";

const createdAdminAccount = async (req, res) => {
    try{
        const hashpwd = await bcrypt.hash('anhtrieu', 10);
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

const handleLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            throw new CustomError.BadRequestError('Bạn cần điển đủ các trường!');
        }
        debugger
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
            throw new CustomError.NotFoundError("Mật khẩu không đúng!");
        }
        throw new CustomError.NotFoundError("Email không đúng!");
    }
    catch(error){
        next(error);
    }
}

const handleLogout = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies || !cookies.accessToken) {
            throw new CustomError.BadRequestError("INVALID TOKEN");
        } else {
            res.clearCookie('accessToken', { httpOnly: true })
                .status(200)
                .end();
        }
    } catch (error) {
        next(error);
    }
};


const handleRegister = async (req, res, next) => {
    const { username, email, password, phone, birthday } = req.body;
        try {
            if (!username || !email || !password) {
                throw new CustomError.BadRequestError("Bạn cần điền đủ các trường");
            }
            const [checkName, checkEmail] = await Promise.all([
                User.findOne({ username }),
                User.findOne({ email }),
            ]);
            if (checkName) {
                throw new CustomError.BadRequestError("Tên đã được sử dụng");
            }
            if (checkEmail) {
                throw new CustomError.BadRequestError("Email đã được sử dụng");
            }
            const hashpwd = await bcrypt.hash(password, 10);
            const newUser 
                = new User({
                    username, email, password: hashpwd, phone, birthday, image: 'images/270_crop_BANHCHUOI.jpg',sex: 'diff',address: '',
                });
            const createUser = await newUser.save(); // lưu DB
            if (createUser) {
                return res.json({
                    message: 'Đăng kí thành công',
                    data: createUser,
                });
            }
            throw new CustomError.BadRequestError("Đăng kí thất bại");
        } catch (error) {
            next(error);
    }
}

const handleUpdate = async (req, res, next) => {
    const update = req.body;
    try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, update, { new: true });
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
        throw new CustomError.BadRequestError("Cập nhật thất bại");
    }
    catch (error){
        next(error);
    }
}

export default {
    createdAdminAccount,
    handleLogin,
    handleRegister,
    handleUpdate,
    handleLogout
}