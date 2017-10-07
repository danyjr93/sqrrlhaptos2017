const express = require("express");
const app = express();
const demoPort = 3000;

app.listen(demoPort, function() {
    console.log("app listen on " + demoPort);
});