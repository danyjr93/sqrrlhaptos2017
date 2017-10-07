const express = require("express");
const app = express();
const demoPort = 3000;
const mongoose = require("mongoose");

var dbOptions = {
    useMongoClient: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000
};

mongoose.connect('mongodb://localhost/haptos    ', { useMongoClient: true });

app.listen(demoPort, function () {
    console.log("app listen on " + demoPort);
});