import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/database';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import orderRouter from './routers/orderRouter';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';
import uploadImgProduct from './routers/uploadImage';
import uploadImgUser from './routers/uploadUser';

mongoose.set('strictQuery', true);
mongoose.connect(config.MONGO_URL)
    .then(() => {
        console.log("Database connect successully!");
    })
    .catch((err) => {
        console.log(err);
    }) 

const app = express();
const PORT = 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    next();
})
app.use('/api/uploads', uploadImgProduct);
app.use('/api/uploads-user', uploadImgUser);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.use('/uploads/ImgProducts', express.static(path.join(__dirname, '../uploads/ImgProducts')));
app.use('/uploads/ImgUsers', express.static(path.join(__dirname, '../uploads/ImgUsers')));

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})