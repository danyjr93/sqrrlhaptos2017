var LocationModel = require("./../models/location");
var VoteModel = require("./../models/vote");

module.exports = function (router) {
    router.get("/locations", function (req, res) {
        LocationModel.find({}, function (err, locations) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(locations);
        })
    });

    router.post("/locations", function (req, res) {
        var location = new LocationModel({
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });

        location.save(function (err, result) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(result);
        });
    });

    router.get("/locations/:id", function (req, res) {
        LocationModel.findById(req.params.id, function (err, result) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(result);
        });
    });

    router.get("/locations/:id/votes", function (req, res) {
        LocationModel.findById(req.params.id, function (err, result) {
            if (err) return res.status(500).send(err);
            else {
                VoteModel.populate(result, { path: "votes", select: ["place", "suggestion"] }, function name(err, result) {
                    return res.status(200).send(result);
                });
            }
        });
    });

    router.post("/locations/:id/votes", function (req, res) {
        var vote = new VoteModel({
            place: req.body.place,
            suggestion: req.body.suggestion
        });

        vote.save(function (err, v) {
            if (err) return res.status(500).send(err);
            LocationModel.findOneAndUpdate({ "_id": req.params.id }, { $addToSet: { votes: v._id } }, function (e, result) {
                if (e) return res.status(500).send(e);
                else {
                    VoteModel.populate(result, { path: "votes", select: ["place", "suggestion"] }, function name(er, result) {
                        if (err) return res.status(500).send(er);
                        return res.status(200).send(result);
                    });
                }
            });
        })
    });
}