"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.authentication = exports.accessToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _token = _interopRequireDefault(require("../config/token"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const accessToken = user => {
  return _jsonwebtoken.default.sign({
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin
  }, _token.default.ACCESS_TOKEN_SECRET);
};
exports.accessToken = accessToken;
const authentication = (req, res, next) => {
  const tokenAccess = req.headers.Authorization || req.headers.authorization;
  if (!tokenAccess?.startsWith('Bearer ')) {
    res.status(400).send({
      message: "Không có quyền truy cập"
    });
  } else {
    const token = tokenAccess.split(' ')[1];
    _jsonwebtoken.default.verify(token, _token.default.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        res.status(400).send({
          message: "Token invalid"
        });
      } else {
        req.user = data;
        next();
      }
    });
  }
};
exports.authentication = authentication;
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(400).send({
      message: "Không đủ quyền"
    });
  }
};
exports.isAdmin = isAdmin;