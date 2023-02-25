"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const orderSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  orderItems: [{
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    qty: {
      type: String,
      required: true
    },
    product: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }],
  shipping: {
    name: String,
    phone: String,
    address: String,
    city: String,
    note: String
  },
  payment: String,
  itemsPrice: Number,
  shipPrice: Number,
  totalPrice: Number
}, {
  timestamps: true
});
const Order = _mongoose.default.model('Order', orderSchema);
var _default = Order;
exports.default = _default;