const user = require("../../models/user");
const bcrypt = require("bcryptjs");

async function cryptPassword(password) {
  return new Promise((resolve) => {
    if (password) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject("Error o crypt");
        }
        bcrypt.hash(password, salt, (errr, hash) => {
          if (errr) {
            reject("Error o crypt");
          }
          resolve(hash);
        });
      });
    }
  });
}
const getUser = async (req, res) => {
  user.find({}, (err, user) => {
    if (err) {
      return res.status(505).json({ sucess: false, message: err });
    }
    return res.status(200).json({ sucess: true, user: user });
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  user.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ sucess: false, message: err });
    }
    if (!user) {
      return res.status(404).json({ sucess: false, message: "User Not Found" });
    }
    return res.status(200).json({ sucess: true, user: user });
  });
};

const createUser = async (req, res) => {
  const { body } = req;
  const password = await cryptPassword(body.password);
  body.password = password;
  const newUser = new user(body);
  newUser.save().then((user, err) => {
    if (err) {
      return res.status(500).json({ sucess: false, message: err });
    }
    return res.status(201).json({ sucess: true, user: user._id });
  });
};

const getUserByLogin = async (req, res) => {
  const { login } = req.params;
  user.findOne({ login: login }, (err, user) => {
    if (err) {
      return res.status(500).json({ sucess: false, message: err });
    }
    if (!user) {
      return res.status(404).json({ sucess: false, message: "User Not Found" });
    }
    return res.status(200).json({ sucess: true, user: user });
  });
};

const updateUser = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  if (body.password) {
    const password = await cryptPassword(body.password);
    body.password = password;
  }
  user.updateOne({ _id: id }, body, (err, user) => {
    if (err) {
      return res.status(500).json({ sucess: false, message: err });
    }
    return res.status(200).json({ sucess: true, message: "User updated" });
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  user.deleteOne({ _id: id }, (err, user) => {
    if (err) {
      return res.status(500).json({ sucess: false, message: err });
    }
    return res.status(200).json({ sucess: true, message: "User deleted" });
  });
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  getUserByLogin,
  updateUser,
  deleteUser,
};
