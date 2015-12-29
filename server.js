var express = require('express');
var path = require('path');

var app = express();

var staticUrl = path.join(__dirname, 'public');

console.log(staticUrl);

app.use(express.static(staticUrl));

app.get('/', function(req, res, next){
    res.sendfile('index.html');
});

app.get('/myApi/user', function(req, res, next){
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

    res.status(200).send([pupkin, ivanov, petrov]);
});

app.listen(3030);