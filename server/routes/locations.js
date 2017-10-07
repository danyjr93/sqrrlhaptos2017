module.exports = function (router) {
    router.get("/locations", function (req, res) {
        return res.status(200).send({ message: "locations" });
    });

    router.get("/locations/:id", function (req, res) {
        return res.status(200).send({ message: "locations " + req.params.id });
    });
}