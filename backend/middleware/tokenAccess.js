import jwt from 'jsonwebtoken';
import config from '../config/token';

export const accessToken = (admin) => {
    return jwt.sign({
        id: admin._id,
        username: admin.username,
        email: admin.email,
        isAdmin: admin.isAdmin
    },
        config.ACCESS_TOKEN_SECRET,
    )
}