const { body, validationResult, param, header } = require("express-validator");
const user = require("../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

exports.login = [
  body("login").custom(async (login) => {
    const valdateUser = await user.findOne({ login: login });

    if (!valdateUser) {
      throw new Error("User nor Found");
    }
    return true;
  }),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be greater thant 3 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];

exports.auth = [
  header("x-access-token")
    .isLength({ min: 3 })
    .withMessage("Must Provide Token"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];
