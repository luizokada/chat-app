const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_URL).catch((e) => {
  console.log("ERROR ON CONNECTION");
  console.log(e);
});

const db = mongoose.connection;

module.exports = db;
