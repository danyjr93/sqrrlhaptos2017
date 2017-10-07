const express = require("express");
const app = express();
let demoPort = 3000;
const router = express.Router();
const api = require("./routes/api");

app.use("/api", api);

app.listen(demoPort, function() {
    console.log("app listen on " + demoPort);
});