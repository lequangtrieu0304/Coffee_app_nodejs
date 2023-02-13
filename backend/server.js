import express from 'express';
import cors from 'cors';
import data from './data.js';
import mongoose from 'mongoose';
import config from './config/database';
import bodyParser from 'body-parser';

import orderRouter from './routers/orderRouter';

mongoose.set('strictQuery', true);
mongoose.connect(config.MONGO_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    }) 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

app.use('/api/orders', orderRouter);

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
})

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})