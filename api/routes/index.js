const express = require("express");
const userRoute = require("./userRoutes");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200);
  });
  app.use(express.json(), userRoute);
};

module.exports = routes;
