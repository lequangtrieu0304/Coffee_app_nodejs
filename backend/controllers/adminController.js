import User from "../models/adminModel";
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
        const findAdmin = await User.findOne({email});
        if(findAdmin){
            const result = await brcypt.compare(password, findAdmin.password);
            if(result){
                const token = accessToken(findAdmin);
                res.send({
                    id: findAdmin._id,
                    username: findAdmin.username,
                    email: findAdmin.email,
                    isAdmin: findAdmin.isAdmin,
                    token: token,
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

export default {
    createdAdminAccount,
    handleLogin,
}