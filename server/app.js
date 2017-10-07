var express = require("express");
var app = express();
var demoPort = 3000;
var router = express.Router();
var api = require("./routes/api");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var bluebird = require("bluebird");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded());
app.use("/api", api);

var dbOptions = {
    useMongoClient: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000
};

mongoose.connect('mongodb://localhost/haptos', { useMongoClient: true, promiseLibrary: bluebird });

app.listen(demoPort, function () {
    console.log("app listen on " + demoPort);
});