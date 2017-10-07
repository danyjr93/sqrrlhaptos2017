
const router = require("express").Router();

const index = require("./index")(router);
const users = require("./users")(router);
const sites = require("./locations")(router);
const places = require("./places")(router);


module.exports = router;