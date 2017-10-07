
var router = require("express").Router();

var index = require("./index")(router);
var users = require("./users")(router);
var sites = require("./locations")(router);
var places = require("./places")(router);


module.exports = router;