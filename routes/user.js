var express = require('express');
var router = express.Router();

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

module.exports = router;



