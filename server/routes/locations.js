var LocationModel = require("./../models/location");
var VoteModel = require("./../models/vote");
var SuggestionModel = require("./../models/suggestion");
var mongoose = require("mongoose");

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

        if (req.body.suggestion && req.body.suggestion.description && req.body.suggestion.justification) {
            var suggestion = new SuggestionModel({
                description: String(req.body.suggestion.description),
                justification: String(req.body.suggestion.justification),
            });

            suggestion.save(function (err, savedSuggestion) {
                if (err) return res.status(500).send(err);

                location.suggestions.push(savedSuggestion);

                location.save(function (err, result) {
                    if (err) return res.status(500).send(err);
                    return res.status(200).send(result);
                });
            });
        } else {
            location.save(function (err, result) {
                if (err) return res.status(500).send(err);
                return res.status(200).send(result);
            });
        }
    });

    router.get("/locations/:id", function (req, res) {
        LocationModel.findById(req.params.id, function (err, result) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(result);
        });
    });

    // router.get("/locations/:id/votes", function (req, res) {
    //     LocationModel.findById(req.params.id, function (err, result) {
    //         if (err) return res.status(500).send(err);
    //         else {
    //             VoteModel.populate(result, { path: "votes", select: ["place", "suggestion"] }, function name(err, result) {
    //                 return res.status(200).send(result);
    //             });
    //         }
    //     });
    // });

    router.post("/locations/:id/votes", function (req, res) {
        LocationModel.findOneAndUpdate({ "_id": req.params.id }, { $inc: { votes: 1 } }, function (e, result) {
            if (e) return res.status(500).send(e);

            return res.status(200).send(result);
        });
    });
}