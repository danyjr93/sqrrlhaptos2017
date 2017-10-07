var mongoose = require("mongoose");

var FailLocationSchema = new mongoose.Schema({
    name: { type: String },
    place: { type: mongoose.Types.ObjectId },
    location: { type: mongoose.Types.ObjectId }
});

module.exports = mongoose.model("FailLocation", FailLocationSchema);