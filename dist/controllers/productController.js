"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _productModel = _interopRequireDefault(require("../models/productModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAllProduct = async (req, res) => {
  try {
    const products = await _productModel.default.find({});
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
  }
};
const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await _productModel.default.findById(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(400).send({
        message: "INVALID"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const getProductByKey = async (req, res) => {
  try {
    const queryKeyword = req.query.searchKeyword ? {
      category: {
        $regex: req.query.searchKeyword,
        $options: 'i'
      }
    } : {};
    const products = await _productModel.default.find({
      ...queryKeyword
    });
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(400).send({
        message: "INVALID"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const createProduct = async (req, res) => {
  try {
    const product = new _productModel.default({
      name: "Tạo sản phẩm",
      description: "Mô tả",
      image: "/images/products-1.jpg",
      price: "0.00đ",
      category: "Phân loại"
    });
    const createProduct = await product.save();
    if (createProduct) {
      res.status(201).send({
        message: "Tạo thành công",
        product: createProduct
      });
    } else {
      res.status(400).send({
        message: "Tạo thất bại"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const updatedProduct = async (req, res) => {
  const {
    name,
    description,
    image,
    price,
    category
  } = req.body;
  try {
    const id = req.params.id;
    const product = await _productModel.default.findById(id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.image = image || product.image;
      product.price = price || product.price;
      product.category = category || product.category;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.status(200).send({
          message: "Đã cập nhật",
          data: updatedProduct
        });
      } else {
        res.status(400).send({
          message: "Cập nhật thất bại"
        });
      }
    } else {
      res.status(400).send({
        message: "Không tìm thấy sản phẩm"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await _productModel.default.findById(id);
    if (product) {
      const result = await product.remove();
      if (result) {
        res.status(200).send({
          message: "Đã xóa",
          data: result
        });
      } else {
        res.status(400).send({
          message: "Xóa thất bại"
        });
      }
    } else {
      res.status(400).send({
        message: "INVALID"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
var _default = {
  getAllProduct,
  createProduct,
  updatedProduct,
  getProductById,
  deleteProduct,
  getProductByKey
};
exports.default = _default;