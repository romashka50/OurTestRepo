var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var staticUrl = path.join(__dirname, 'public');

var myStack = function(req, res, next){
    console.log('my custom stackMidlware for /kill');

    next();
};

var userRouter = require('./routes/user');

app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 200}));

app.use(express.static(staticUrl));

app.use(function(req, res, next){
    req.logged = req.logged || {};
    req.logged.date = new Date();

    next();
});

app.get('/', function(req, res, next){
    console.log(req.logged);
    res.sendfile('index.html');
});

app.all('*', function(req, res, next){
    req.logged.ip = req.ip;

    next();
});

app.use('/myApi/user', userRouter);

app.listen(3030);
