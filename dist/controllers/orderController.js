"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _orderModel = _interopRequireDefault(require("../models/orderModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const summaryOrder = async (req, res) => {
  try {
    const dailyOrders = await _orderModel.default.aggregate([{
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt'
          }
        },
        orders: {
          $sum: 1
        },
        sales: {
          $sum: '$totalPrice'
        },
        ordersOfDay: {
          $addToSet: '$orderItems'
        }
      }
    }]);
    res.send(dailyOrders);
  } catch (err) {
    console.log(err);
  }
};
const sellingProducts = async (req, res) => {
  try {
    const sellingProducts = await _orderModel.default.aggregate([{
      $unwind: "$orderItems"
    }, {
      $group: {
        _id: "$orderItems.product",
        totalQty: {
          $sum: {
            $toInt: "$orderItems.qty"
          }
        }
      }
    }, {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "sell"
      }
    }, {
      $sort: {
        "totalQty": -1
      }
    }, {
      $limit: 5
    }]);
    res.send(sellingProducts);
  } catch (err) {
    console.log(err);
  }
};
const getAllOrder = async (req, res) => {
  try {
    const orders = await _orderModel.default.find({}).populate('user');
    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
  }
};
const getOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await _orderModel.default.findById(id).populate('user', '-_id -image -password -sex -isAdmin -birthday');
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(400).send({
        message: "Get Error"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const createOrderLogin = async (req, res) => {
  const {
    orderItems,
    shipPrice,
    itemsPrice,
    totalPrice,
    payment
  } = req.body;
  try {
    const newOrder = {
      orderItems,
      user: req.user.id,
      shipPrice,
      itemsPrice,
      totalPrice,
      payment
    };
    const order = await _orderModel.default.create(newOrder);
    if (order) {
      res.status(201).send({
        message: "Đặt hàng thành công",
        order: order
      });
    } else {
      res.status(400).send({
        message: "Đặt hàng thất bại"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const createOrder = async (req, res) => {
  const {
    orderItems,
    shipping,
    shipPrice,
    itemsPrice,
    totalPrice,
    payment
  } = req.body;
  try {
    const newOrder = {
      orderItems,
      shipping,
      shipPrice,
      itemsPrice,
      totalPrice,
      payment
    };
    const order = await _orderModel.default.create(newOrder);
    if (order) {
      res.status(201).send({
        message: "Đặt hàng thành công",
        order: order
      });
    } else {
      res.status(400).send({
        message: "Đặt hàng thất bại"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
var _default = {
  createOrder,
  getOrderById,
  getAllOrder,
  createOrderLogin,
  summaryOrder,
  sellingProducts
};
exports.default = _default;