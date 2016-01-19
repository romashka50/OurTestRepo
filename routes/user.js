var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserModel;

require('../models/user');
UserModel = mongoose.model('user');

router.get('/', function (req, res, next) {
    UserModel.find().exec(function (err, users) {
        if (err) {
            return next(err);
        }

        res.status(200).send(users);
    });
});
router.get('/:id', function (req, res, next) {
    var id = req.params.id;

    res.status(200).send(id);
});
router.post('/', function (req, res, next) {
    var user = new UserModel(req.body);

    user.save(function (err, _user) {
        if (err) {
            return next(err);
        }

        res.status(200).send(_user);
    });
});

module.exports = router;



