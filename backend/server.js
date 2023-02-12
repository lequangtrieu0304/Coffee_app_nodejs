import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();
app.use(cors());

const PORT = 3000;

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