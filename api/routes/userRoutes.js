const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  getUserByLogin,
  updateUser,
  deleteUser,
} = require("../controllers/user/userCtrl");
const {
  login,
  authorization,
  logout,
} = require("../controllers/auth/authCtrl");
const userValidator = require("../controllers/user/validatorUser");
const authValidator = require("../controllers/auth/validatorAuth");

const userRoute = express.Router();

userRoute.get("/user", authValidator.auth, authorization, getUser);
userRoute.get("/user/:id", authValidator.auth, authorization, getUserById);
userRoute.get(
  "/user/login/:login",
  authValidator.auth,
  authorization,
  getUserByLogin
);
userRoute.post("/user", userValidator.createuser, createUser);
userRoute.put(
  "/user/:id",
  authValidator.auth,
  authorization,
  userValidator.updateUser,
  updateUser
);
userRoute.delete(
  "/user/:id",
  authValidator.auth,
  authorization,
  userValidator.deleteUser,
  deleteUser
);
userRoute.post("/login", authValidator.login, login);
userRoute.post("/logout", authValidator.login, logout);

module.exports = userRoute;
