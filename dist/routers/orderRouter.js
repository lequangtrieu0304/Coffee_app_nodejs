"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _orderController = _interopRequireDefault(require("../controllers/orderController"));
var _tokenAccess = require("../middleware/tokenAccess");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/summary', _tokenAccess.authentication, _tokenAccess.isAdmin, _orderController.default.summaryOrder);
router.get('/selling-products', _orderController.default.sellingProducts);
router.get('/', _orderController.default.getAllOrder);
router.get('/:id', _orderController.default.getOrderById);
router.post('/auth', _tokenAccess.authentication, _orderController.default.createOrderLogin);
router.post('/', _orderController.default.createOrder);
var _default = router;
exports.default = _default;