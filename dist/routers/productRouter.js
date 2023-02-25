"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _productController = _interopRequireDefault(require("../controllers/productController"));
var _tokenAccess = require("../middleware/tokenAccess");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
// router.get('/', productController.getAllProduct);

router.get('/', _productController.default.getProductByKey);
router.get('/:id', _productController.default.getProductById);
router.post('/', _tokenAccess.authentication, _productController.default.createProduct);
router.put('/:id', _tokenAccess.authentication, _tokenAccess.isAdmin, _productController.default.updatedProduct);
router.delete('/:id', _tokenAccess.authentication, _tokenAccess.isAdmin, _productController.default.deleteProduct);
var _default = router;
exports.default = _default;