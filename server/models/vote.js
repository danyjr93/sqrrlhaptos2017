var mongoose = require("mongoose");

var VoteSchema = new mongoose.Schema({
    place: { type: mongoose.SchemaTypes.ObjectId, ref: "Place" },
    suggestion: { type: String },
});

module.exports = mongoose.model("Vote", VoteSchema);