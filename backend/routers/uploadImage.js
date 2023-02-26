import express from 'express';
import multer from 'multer';
import { authentication, authenticationCookie, isAdmin } from '../middleware/tokenAccess';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/');
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}.jpg`);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }
    else {
        cb(new Error("INVALID", 400), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

router.post('/image', authenticationCookie, isAdmin, upload.single('image'), (req, res) => {
    res.status(201).send({
        image: `/${req.file.path}`,
    })
})

export default router;