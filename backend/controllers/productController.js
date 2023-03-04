import Product from '../models/productModel';

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
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
            return res.status(200).json(product);
        }
        return res.status(400).json({
            message: "INVALID",
        })
    }
    catch(err){
        console.log(err);
    }
}

const getProductByKey = async (req, res) => {
    try {
        const { searchKeyword } = req.query;
        const queryKeyword = searchKeyword
            ? { category: { $regex: searchKeyword, $options: 'i' } }
            : {};
        const products = await Product.find({ ...queryKeyword }) ?? [];
        return res.status(200).json(products || []);
    } 
    catch (err) {
        console.log(err);
    }
};
  
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
            return res.status(201).json({
                message: "Tạo thành công",
                product: createProduct,
            })
        }
        return res.status(400).json({
            message: "Tạo thất bại",
        })
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
            product.name = name ?? product.name
            product.description = description ?? product.description
            product.image = image ?? product.image
            product.price = price ?? product.price
            product.category = category ?? product.category
            product.countInStock = countInStock ?? product.countInStock
            product.sold = sold ?? product.sold

            const updatedResult = await Product.updateOne({_id: product._id}, product);
            if(updatedResult.acknowledged){
                return res.status(200).json({
                    message: "Đã cập nhật",
                    data: product,
                })
            }
            return res.status(400).json({
                message: "Cập nhật thất bại",
            })
        }
        return res.status(400).json({
            message: "Không tìm thấy sản phẩm",
        })
    }
    catch (err){
        console.log(err);
        return res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm" });
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        const result = await product.remove();
        if (result) {
            return res.status(200).json({
                message: "Đã xóa",
                data: result,
            });
        }
        return res.status(400).json({
            message: "Xóa thất bại",
        });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Lỗi hệ thống",
        });
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

            const updateResult = await Product.updateOne({_id: product._id }, product);
            if(updateResult.acknowledged){
                return res.status(200).json({
                    data: product.reviews[product.reviews.length - 1],
                })
            }
            return res.status(400).json({
                message: "INVALID",
            })
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