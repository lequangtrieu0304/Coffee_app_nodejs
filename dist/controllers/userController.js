"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _tokenAccess = require("../middleware/tokenAccess");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createdAdminAccount = async (req, res) => {
  try {
    const hashpwd = await _bcrypt.default.hash('anhtrieu', 10);
    const admin = {
      username: 'quangtrieu',
      email: 'quangtrieu01@gmail.com',
      password: hashpwd,
      isAdmin: true
    };
    const adminAccount = await _userModel.default.create(admin);
    if (adminAccount) {
      res.status(200).send({
        message: 'Tao thanh cong',
        result: adminAccount
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const handleLogin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Bạn cần điền đủ các trường"
    });
  }
  try {
    const findUser = await _userModel.default.findOne({
      email
    });
    if (findUser) {
      const result = await _bcrypt.default.compare(password, findUser.password);
      if (result) {
        const token = (0, _tokenAccess.accessToken)(findUser);
        res.send({
          id: findUser._id,
          username: findUser.username,
          email: findUser.email,
          phone: findUser.phone,
          birthday: findUser.birthday,
          sex: findUser.sex,
          address: findUser.address,
          image: findUser.image,
          isAdmin: findUser.isAdmin,
          token
        });
      } else {
        res.status(400).send({
          message: "Mật khẩu không đúng"
        });
      }
    } else {
      res.status(400).send({
        message: "Email không đúng"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const handleRegister = async (req, res) => {
  const {
    username,
    email,
    password,
    phone,
    birthday
  } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Bạn cần điền đủ các trường'
      });
    }
    const checkName = await _userModel.default.findOne({
      username
    });
    const checkEmail = await _userModel.default.findOne({
      email
    });
    if (checkName) {
      res.status(400).send({
        message: 'Tên đã được sử dụng'
      });
    } else if (checkEmail) {
      res.status(400).send({
        message: 'Email đã được sử dụng'
      });
    } else {
      const hashpwd = await _bcrypt.default.hash(password, 10);
      const newUser = new _userModel.default({
        username,
        email,
        password: hashpwd,
        phone,
        birthday,
        image: 'images/270_crop_BANHCHUOI.jpg',
        sex: 'diff',
        address: ''
      });
      const createUser = await newUser.save();
      if (createUser) {
        res.send({
          message: "Đăng kí thành công",
          data: createUser
        });
      } else {
        res.status(400).send({
          message: 'Đăng kí thất bại'
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
const handleUpdate = async (req, res) => {
  const update = req.body;
  try {
    const updateUser = await _userModel.default.findByIdAndUpdate({
      _id: req.params.id
    }, update, {
      new: true
    });
    const user = await updateUser.save();
    if (user) {
      res.send({
        message: 'Đã cập nhật',
        id: user._id,
        username: user.username,
        phone: user.phone,
        email: user.email,
        address: user.address,
        birthday: user.birthday,
        sex: user.sex,
        isAdmin: user.isAdmin,
        image: user.image,
        token: (0, _tokenAccess.accessToken)(user)
      });
    } else {
      res.status(400).send({
        message: "Cập nhật thất bại"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
var _default = {
  createdAdminAccount,
  handleLogin,
  handleRegister,
  handleUpdate
};
exports.default = _default;