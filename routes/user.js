var express = require('express');
var mongoose = require('mongoose');
var crypto = require('crypto');
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
    var shaSum = crypto.createHash('sha256');

    if(user.password){
        shaSum.update(user.password);
        user.password = shaSum.digest('hex');
    }

    user.save(function (err, _user) {
        if (err) {
            return next(err);
        }

        res.status(200).send(_user);
    });
});
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;

    UserModel.findByIdAndRemove(id, function (err, response) {
        if (err) {
            return next(err);
        }

        res.status(200).send({success: 'removed'});
    });
});
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    var body = req.body;

    UserModel.findByIdAndUpdate(id, body, {new: true}, function (err, response) {
        if (err) {
            return next(err);
        }

        res.status(200).send(response);
    });
});
router.patch('/:id', function (req, res, next) {
    var id = req.params.id;
    var body = req.body;

    UserModel.findByIdAndUpdate(id, body, {new: true}, function (err, response) {
        if (err) {
            return next(err);
        }

        res.status(200).send(response);
    });
});

module.exports = router;



