var UserModel = require("./../models/user");

module.exports = function (router) {
    router.get("/users", function (req, res) {
        UserModel.find({}, function (err, users) {
            if(err) return res.status(500).send(err);
            return res.status(200).send(users);
        })
    });

    router.get("/users/:id", function (req, res) {
        UserModel.findById(req.params.id, function (err, user) {
            if(err) return res.status(500).send(err);
            return res.status(200).send(user);
        })
    });
}