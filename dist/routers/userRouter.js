"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _tokenAccess = require("../middleware/tokenAccess");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/create-admin', _userController.default.createdAdminAccount);
router.post('/login', _userController.default.handleLogin);
router.post('/register', _userController.default.handleRegister);
router.put('/update/:id', _tokenAccess.authentication, _userController.default.handleUpdate);
var _default = router;
exports.default = _default;