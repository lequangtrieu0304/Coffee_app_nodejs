import Product from '../models/productModel';

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    }
    catch (err){
        console.log(err);
    }
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(product){
            res.status(200).send(product);
        }
        else {
            res.status(400).send({
                message: "INVALID",
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

const getProductByKey = async (req, res) => {
    try{
        const queryKeyword = req.query.searchKeyword
            ? {
                category: {
                    $regex: req.query.searchKeyword,
                    $options: 'i',
                }
            }
            : {}
        const products = await Product.find({...queryKeyword})
        if(products){
            res.status(200).send(products)
        }
        else {
            res.status(400).send({
                message: "INVALID",
            })
        }
          
    }
    catch (err){
        console.log(err);
    }
}

const createProduct = async (req, res) => {
    try{
        const product = new Product({
            name: "Tạo sản phẩm",
            description: "Mô tả",
            image: "/images/products-1.jpg",
            price: "0.00đ",
            category: "Phân loại",
            countInStock: 0,
            sold: 0,
        });
        const createProduct = await product.save();
        if(createProduct){
            res.status(201).send({
                message: "Tạo thành công",
                product: createProduct,
            })
        }
        else {
            res.status(400).send({
                message: "Tạo thất bại",
            })
        }
    }
    catch (err){
        console.log(err);
    }
}

const updatedProduct = async (req, res) => {
    const { name, description, image, price, category, countInStock, sold } = req.body;
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(product){
            product.name = name || product.name
            product.description = description || product.description
            product.image = image || product.image
            product.price = price || product.price
            product.category = category || product.category
            product.countInStock = countInStock || product.countInStock
            product.sold = sold || product.sold

            const updatedProduct = await product.save();
            if(updatedProduct){
                res.status(200).send({
                    message: "Đã cập nhật",
                    data: updatedProduct,
                })
            }
            else {
                res.status(400).send({
                    message: "Cập nhật thất bại",
                })
            }
        }
        else {
            res.status(400).send({
                message: "Không tìm thấy sản phẩm",
            })
        }
    }
    catch (err){
        console.log(err);
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(product){
            const result = await product.remove();
            if(result){
                res.status(200).send({
                    message: "Đã xóa",
                    data: result,
                })
            }
            else {
                res.status(400).send({
                    message: "Xóa thất bại",
                })
            }
        }
        else {
            res.status(400).send({
                message: "INVALID",
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

const createReview = async (req, res) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(product){
            const review = {
                user: req.user._id,
                name: req.user.username,
                rating: req.body.rating,
                comment: req.body.comment,
            }
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((a, c) => a + c.rating, 0) / product.reviews.length;

            const updateProduct = await product.save();
            if(updateProduct){
                res.status(200).send({
                    data: updateProduct.reviews[updateProduct.reviews.length - 1],
                })
            }
            else {
                res.status(400).send({
                    message: "INVALID",
                })
            }
        }
    }
    catch (err){
        console.log(err);
    }
}

export default {
    getAllProduct,
    createProduct,
    updatedProduct,
    getProductById,
    deleteProduct,
    getProductByKey,
    createReview
}