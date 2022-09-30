const express = require("express");
const socketio = require("socket.io");

const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(5000, () => {
  console.log("Listening in port 5000");
});

const io = socketio(server);

io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "Welcome " });
  socket.on("messageToServer", (msg) => {
    console.log(msg);
  });
});
