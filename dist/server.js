"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _database = _interopRequireDefault(require("./config/database"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _path = _interopRequireDefault(require("path"));
var _orderRouter = _interopRequireDefault(require("./routers/orderRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _productRouter = _interopRequireDefault(require("./routers/productRouter"));
var _uploadImage = _interopRequireDefault(require("./routers/uploadImage"));
var _uploadUser = _interopRequireDefault(require("./routers/uploadUser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_mongoose.default.set('strictQuery', true);
_mongoose.default.connect(_database.default.MONGO_URL).then(() => {
  console.log("Database connect successully!");
}).catch(err => {
  console.log(err);
});
const app = (0, _express.default)();
const PORT = 3500;
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use((0, _cors.default)());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  next();
});
app.use('/api/uploads', _uploadImage.default);
app.use('/api/uploads-user', _uploadUser.default);
app.use('/api/orders', _orderRouter.default);
app.use('/api/users', _userRouter.default);
app.use('/api/products', _productRouter.default);
app.use('/uploads/ImgProducts', _express.default.static(_path.default.join(__dirname, '../uploads/ImgProducts')));
app.use('/uploads/ImgUsers', _express.default.static(_path.default.join(__dirname, '../uploads/ImgUsers')));
app.use(_express.default.static(_path.default.join(__dirname, '../frontend')));
app.get('*', (req, res) => {
  res.sendFile(_path.default.join(__dirname, '../frontend/index.html'));
});
app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});