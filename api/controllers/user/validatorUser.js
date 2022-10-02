const { body, validationResult, param } = require("express-validator");
const user = require("../../models/user");

exports.createuser = [
  body("login")
    .isLength({ min: 5 })
    .withMessage("Login must be greater thant 5 characters"),
  body("login").custom(async (login) => {
    const valdateUser = await user.findOne({ login: login });

    if (valdateUser) {
      throw new Error("User alredy exits");
    }
    return true;
  }),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be greater thant 3 characters"),
  body("name").isLength({ min: 1 }).withMessage("user Must Have a Name"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];

exports.updateUser = [
  param("id").custom(async (id) => {
    const valdateUser = await user.findOne({ _id: id });

    if (!valdateUser) {
      throw new Error("User do not exits");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];

exports.deleteUser = [
  param("id").custom(async (id) => {
    const valdateUser = await user.findOne({ _id: id });
    if (!valdateUser) {
      throw new Error("User do not exits");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];
