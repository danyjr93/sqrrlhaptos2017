var mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
    x: { type: String, required: true },
    y: { type: String, required: true }
});

module.exports = mongoose.model("Location", LocationSchema);