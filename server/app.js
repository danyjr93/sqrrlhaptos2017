const express = require("express");
const app = express();
let demoPort = 3000;
const router = express.Router();
const api = require("./routes/api");
const mongoose = require("mongoose");

app.use("/api", api);

var dbOptions = {
    useMongoClient: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000
};

mongoose.connect('mongodb://localhost/haptos', { useMongoClient: true });

app.listen(demoPort, function () {
    console.log("app listen on " + demoPort);
});