import axios from "axios";
import socket, { Socket } from "socket.io";

const URL_API = "http://localhost:5000";
exports.api = axios.create({
  baseURL: URL_API,
});

exports.socket = Socket(URL_API);
