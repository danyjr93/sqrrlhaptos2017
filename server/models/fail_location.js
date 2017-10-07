var mongoose = require("mongoose");

var FailLocationSchema = new mongoose.Schema({
    name: { type: String }
});

module.exports = mongoose.model("FailLocation", FailLocationSchema);