var mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
    x: { type: String, required: true },
    y: { type: String, required: true },
    votes: { type: Array, ref: "Votes" },
    fail: { type: Array, ref: "Place" }
});

module.exports = mongoose.model("Location", LocationSchema);