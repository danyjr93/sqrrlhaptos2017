var mongoose = require("mongoose");

var VoteSchema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId },
    place: { type: mongoose.SchemaTypes.ObjectId },
    suggestion: { type: String },
});

module.exports = mongoose.model("Vote", VoteSchema);