const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const routes = require("./routes/index");
const db = require("./db");
const { blockList } = require("./redis/blockList");
const { allowList } = require("./redis/allowList");
require("dotenv").config();

db.once("open", () => {
  console.log("Connected to DataBase");
});

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));

const server = app.listen(5000, () => {
  console.log("Listening in port 5000");
});
routes(app);
