var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserModel;

require('../models/user');
UserModel = mongoose.model('user');

router.get('/', function(req, res, next){
    var pupkin = {
        _id: 1,
        name: 'Pupkin',
        age: 30
    };
    var ivanov = {
        _id: 2,
        name: 'Ivanov',
        age: 36
    };
    var petrov = {
        _id: 3,
        name: 'Petrov',
        age: 28
    };

    console.log(req.logged);

    res.status(200).send([pupkin, ivanov, petrov]);
});
router.get('/:id', function(req, res, next){
    var id = req.params.id;

    res.status(200).send(id);
});
router.post('/', function(req, res, next){
    var user = new UserModel(req.body);

    user.save(function(err, _user){
        if(err){
            return next(err);
        }

        res.status(200).send(_user);
    });
});

module.exports = router;



