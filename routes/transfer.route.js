var express = require("express");

var controller = require("../controllers/transfer.controller");

var route = express.Router();

route.get("/create", controller.getCreate);

route.post("/create", controller.postCreate);


module.exports = route;
