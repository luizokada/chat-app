const express = require("express");
const socketio = require("socket.io");
const routes = require("./routes/index");
const db = require("./db");
require("dotenv").config();

db.once("open", () => {
  console.log("Connected to DataBase");
});
const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(4000, () => {
  console.log("Listening in port 5000");
});
routes(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "Welcome " });
  socket.on("messageToServer", (msg) => {
    console.log(msg);
  });
});