module.exports = function (router) {
    router.get("/places", function (req, res) {
        return res.status(200).send({ message: "places" });
    });

    router.get("/places/:id", function (req, res) {
        return res.status(200).send({ message: "places " + req.params.id });
    });

    router.get("/places/:id/votes", function (req, res) {
        return res.status(200).send({ message: "votes for place " + req.params.id });
    });

    router.post("/places/:id/votes", function (req, res) {
        return res.status(200).send({ message: "vote registered for place" + req.params.id });
    });
}