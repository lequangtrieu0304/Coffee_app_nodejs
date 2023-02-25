"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _tokenAccess = require("../middleware/tokenAccess");
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
const storage = _multer.default.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/imgProducts');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error("INVALID", 400), false);
  }
};
const upload = (0, _multer.default)({
  storage: storage,
  fileFilter: fileFilter
});
router.post('/image', _tokenAccess.authentication, _tokenAccess.isAdmin, upload.single('image'), (req, res) => {
  res.status(201).send({
    image: `${req.file.path}`
  });
});
var _default = router;
exports.default = _default;