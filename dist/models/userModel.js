"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false
  },
  phone: {
    type: String,
    require: true
  },
  birthday: {
    type: String
  },
  image: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  sex: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});
const User = _mongoose.default.model('User', userSchema);
var _default = User;
exports.default = _default;