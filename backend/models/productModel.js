import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        require: true,
        default: 0,
        min: 0,
        max: 5,
    }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
        default: 0.0,
    },
    rating: {
        type: String,
        default: 0.0,
        require: true
    },
    numReviews: {
        type: Number,
        default: 0,
        require: true,
    },
    reviews: [reviewSchema],
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema);
export default Product;