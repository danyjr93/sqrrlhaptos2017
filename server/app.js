var express = require("express");
var app = express();
var demoPort = 3000;
var router = express.Router();
var api = require("./routes/api");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var bluebird = require("bluebird");
var cors = require("cors");
var path = require("path");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", api);
app.use("/", express.static(__dirname + "/public/"));
app.use("/materialize", express.static(__dirname + "/node_modules/materialize-css/dist/"));
app.use("/angular", express.static(__dirname + "/node_modules/angular/"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use("/uirouter", express.static(__dirname + "/node_modules/@uirouter/angularjs/release/"));
app.use("/ngmap", express.static(__dirname + "/node_modules/ngmap/build/scripts/"));

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