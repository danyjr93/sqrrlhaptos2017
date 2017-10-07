module.exports = function (router) {
    router.get("/", function (req, res) {
        return res.status(200).send({ message: "index of api" });
    });
};