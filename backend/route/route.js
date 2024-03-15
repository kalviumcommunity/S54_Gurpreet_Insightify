const express = require("express");

const Router = express.Router();

Router.use(express.json());

Router.get("/", (req, res) => {
  res.send("Route is working");
});

module.exports = { Router };
