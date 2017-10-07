var mongoose = require("mongoose");

var SuggestionSchema = new mongoose.Schema({
    description: { type: String },
    justification: { type: String },
    votes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Suggestion", SuggestionSchema);