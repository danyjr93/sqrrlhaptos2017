var mongoose = require("mongoose");

var PlaceSchema = new mongoose.Schema({
    name: { type: String }
});

module.exports = mongoose.model("Place", PlaceSchema);