import jwt from 'jsonwebtoken';
import config from '../config/token';

export const accessToken = (user) => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    },
        config.ACCESS_TOKEN_SECRET,
    )
}

export const authentication = (req, res, next) => {
    const tokenAccess = req.headers.Authorization || req.headers.authorization;
    if(!tokenAccess?.startsWith('Bearer ')){
        res.status(400).send({
            message: "Không có quyền truy cập",
        })
    }
    else {
        const token = tokenAccess.split(' ')[1];
        jwt.verify(
            token, config.ACCESS_TOKEN_SECRET,
            (err, data) => {
                if(err){
                    res.status(400).send({
                        message: "Token invalid",
                    })
                }
                else {
                    req.user = data;
                    next();
                }
            }
        )
    }
}

export const authenticationCookie = (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.accessToken){
        return res.status(400).send({
            message: "Cookies is require",
        })
    }
    else {
        const token = cookies.accessToken;
        jwt.verify(
            token, config.ACCESS_TOKEN_SECRET,
            (err, data) => {
                if(err){
                    res.status(400).send({
                        message: "TOKEN INVALID",
                    })
                }
                else {
                    req.user = data;
                    next();
                }
            }
        )
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }
    else {
        res.status(400).send({
            message: "Không đủ quyền"
        })
    }
}