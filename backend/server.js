import express from 'express';
import cors from 'cors';
import data from './data.js';
import mongoose from 'mongoose';
import config from './config/database';
import bodyParser from 'body-parser';
import path from 'path';

import orderRouter from './routers/orderRouter';
import adminRouter from './routers/adminRouter';

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

const PORT = 3001;

app.use('/api/orders', orderRouter);
app.use('/api/users', adminRouter);

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = data.products.find(x => x._id === id);
    if(product){
        res.send(product);
    }
    else {
        res.send({message: "Not Found"})
    }
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})