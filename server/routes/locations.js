module.exports = function (router) {
    router.get("/locations", function (req, res) {
        return res.status(200).send({ message: "locations" });
    });

    router.get("/locations/:id", function (req, res) {
        return res.status(200).send({ message: "locations " + req.params.id });
    });

    router.get("/locations/:id/votes", function (req, res) {
        return res.status(200).send({ message: "votes for location " + req.params.id });
    });

    router.post("/locations/:id/votes", function (req, res) {
        return res.status(200).send({ message: "vote applied for location " + req.params.id });
    });
}