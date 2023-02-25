"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const reviewSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  name: {
    type: String,
    require: true
  },
  rating: {
    type: Number,
    require: true,
    default: 0,
    min: 0,
    max: 5
  },
  comment: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});
const productSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  price: {
    type: String,
    require: true,
    default: 0.0
  },
  rating: {
    type: String,
    default: 0.0,
    require: true
  },
  numReviews: {
    type: Number,
    default: 0,
    require: true
  },
  reviews: [reviewSchema]
}, {
  timestamps: true
});
const Product = _mongoose.default.model('Product', productSchema);
var _default = Product;
exports.default = _default;