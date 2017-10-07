module.exports = function (router) {
    router.get("/users", function (req, res) {
        return res.status(200).send({ message: "users" });
    });

    router.get("/users/:id", function (req, res) {
        return res.status(200).send({ message: "user " + req.params.id });
    });
}