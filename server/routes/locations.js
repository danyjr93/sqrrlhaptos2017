var LocationModel = require("./../models/location");
var VoteModel = require("./../models/vote");
var SuggestionModel = require("./../models/suggestion");
var mongoose = require("mongoose");
var _ = require("lodash");

module.exports = function (router) {
    // router.delete("/locations", function(req, res){
    //     LocationModel.rem
    // });

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

    router.post("/locations/:id/votes", function (req, res) {
        LocationModel.findOneAndUpdate({ "_id": req.params.id }, { $inc: { votes: 1 } }, function (e, result) {
            if (e) return res.status(500).send(e);

            return res.status(200).send(result);
        });
    });

    router.post("/locations/:id/suggestions", function (req, res) {
        if (!req.body.description || !req.body.justification)
            return res.status(400).send("description and justification are required");

        LocationModel.findOne({ "_id": req.params.id }, function (err, location) {
            if (!location || err) return res.status(500).send(err || "No location");

            var suggestion = new SuggestionModel({
                description: String(req.body.description),
                justification: String(req.body.justification),
            });

            suggestion.save(function (err, savedSuggestion) {
                if (err) return res.status(500).send(err);

                location.suggestions.push(savedSuggestion);
                location.save(function (err, locationSaved) {
                    if (err) return res.status(500).send(err);

                    return res.status(200).send(locationSaved);
                });
            });
        });
    });


    router.post("/locations/:id/suggestions/:suggestionid/votes", function (req, res) {
        LocationModel.findOne({ "_id": String(req.params.id), "suggestions._id": String(req.params.suggestionid) }, {           
        }, function (err, doc) {
            if (err || !doc) return res.status(400).send(err || "no suggestions found");

            return res.status(200).send(doc);
        });

        // LocationModel.findOne({ "_id": req.params.id }, function (err, location) {
        //     if (!location || err) return res.status(500).send(err || "No location");

        //     if (location.suggestions && location.suggestions.length > 0) {


        //         // var existing = _.findIndex(location.suggestions, function (suggestion) {
        //         //     return String(suggestion._id) === String(req.params.suggestionid);
        //         // });

        //         // if (existing === -1) {
        //         //     return res.status(400).send("No suggestion registered");
        //         // }

        //         // console.log(location.suggestions[existing].votes);
        //         // location.suggestions[existing].votes++;
        //         // console.log(location.suggestions[existing].votes);

        //         // location.save(function (err, locationSaved) {
        //         //     if (err) return res.status(500).send(err);

        //         //     return res.status(200).send(locationSaved);
        //         // });
        //         // var updatedSuggestion = new SuggestionModel({
        //         //     description: String(location.suggestions[existing].description),
        //         //     justification: String(location.suggestions[existing].justification),
        //         //     votes: String(location.suggestions[existing].votes)
        //         // });

        //         // updatedSuggestion.save(function (err, savedSuggestion) {
        //         //     if (err) return res.status(500).send(err);

        //         //     location.suggestions[existing] = savedSuggestion;


        //         // });
        //     }
        // });
    });
}