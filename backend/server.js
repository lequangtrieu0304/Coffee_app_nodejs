import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/database';
import bodyParser from 'body-parser';
import path from 'path';

import orderRouter from './routers/orderRouter';
import adminRouter from './routers/adminRouter';
import productRouter from './routers/productRouter';
import uploadImgRouter from './routers/uploadImage';

mongoose.set('strictQuery', true);
mongoose.connect(config.MONGO_URL)
    .then(() => {
        console.log("Database connect successully!");
    })
    .catch((err) => {
        console.log(err);
    }) 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

app.use('/api/uploads', uploadImgRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', adminRouter);
app.use('/api/products', productRouter);

app.use('/uploads/ImgProducts', express.static(path.join(__dirname, '../uploads/ImgProducts')));

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})