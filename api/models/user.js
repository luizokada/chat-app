const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  passworld: { type: String, required: true },
  login: { type: String, required: true },
});

userSchema.methods.comparePassword = function (password) {
  if (password) return bcrypt.compareSync(password, this.password); // Returns true if password matches, false if doesn't
  return false;
};

module.exports = mongoose.model("user", userSchema);
