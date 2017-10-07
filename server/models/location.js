var mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    votes: { type: Number, default: 0 },
    suggestions: { type: Array, ref: "Suggestion" },
    fail: { type: Array, ref: "Place" }
});

module.exports = mongoose.model("Location", LocationSchema);