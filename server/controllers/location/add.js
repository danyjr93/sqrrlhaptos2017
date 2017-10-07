var LocationModel = require("./../../models/location");

function add(req, res) {
    var data = req.body;

    if (typeof data.x !== "string" || typeof data.y !== "string") return res.status(400).send("Location Malformed Data");
    else{
        var location = new LocationModel({
            x: String(data.x),
            y: String(data.x)
        })
    }
};


