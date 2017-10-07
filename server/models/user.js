var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    email: { type: String, require: true },
    type: { type: String, enum: ["NORMAL", "OWNER", "ENTREPRENEUR"], default: "NORMAL" },
    locations: { type: [mongoose.SchemaTypes.ObjectId], default: [] }
});

module.exports = mongoose.model("User", UserSchema);