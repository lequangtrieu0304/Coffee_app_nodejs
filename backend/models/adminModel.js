import mongoose from "mongoose";

const adminSchema = new mongoose.Schema ({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false,
    }
}, {
    timestamps: true,
})

const User = mongoose.model('admin', adminSchema);

export default User;