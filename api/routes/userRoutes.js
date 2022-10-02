const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  getUserByLogin,
  updateUser,
  deleteUser,
} = require("../controllers/user/userCtrl");
const validator = require("../controllers/user/validatorUser");

const userRoute = express.Router();

userRoute.get("/user", getUser);
userRoute.get("/user/:id", getUserById);
userRoute.get("/user/login/:login", getUserByLogin);
userRoute.post("/user", validator.createuser, createUser);
userRoute.put("/user/:id", validator.updateUser, updateUser);
userRoute.delete("/user/:id", validator.deleteUser, deleteUser);

module.exports = userRoute;
