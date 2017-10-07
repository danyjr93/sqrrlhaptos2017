module.exports = function (router) {
    router.get("/users", function (req, res) {
        return res.status(200).send({ message: "users" });
    });
}