var PlaceModel = require("./../models/place");

module.exports = function (router) {
    router.get("/places", function (req, res) {
        PlaceModel.find({}, function (err, result) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(result);
        });
    });

    router.get("/places/:id", function (req, res) {
        PlaceModel.findById(req.params.id, function (err, result) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(result);
        });
    });

    router.get("/places/:id/votes", function (req, res) {
        return res.status(200).send({ message: "votes for place " + req.params.id });
    });

    router.post("/places/:id/votes", function (req, res) {
        return res.status(200).send({ message: "vote registered for place" + req.params.id });
    });
}