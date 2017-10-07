const express = require("express");
const app = express();
let demoPort = 3000;
const router = express.Router();
const api = require("./routes/api");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bluebird = require("bluebird");
const cors = require("cors");

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