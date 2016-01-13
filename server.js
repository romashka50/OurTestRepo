var express = require('express');
var mongoose = require('mongoose');
var app = express();
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var staticUrl = path.join(__dirname, 'public');

var myStack = function(req, res, next){
    console.log('my custom stackMidlware for /kill');

    next();
};
var env = process.env.NODE_ENV || 'development';
var connectionStr;
var db;
var opts;

require('./config/' + env);
opts = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
};

//connectionStr = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

//---single connect -------
//-------use connectionString------------'mongodb://user:pass@host:port/dbName'
//-----------mongoose.connect(connectionStr);
//-------use variables------------connect(host, port, dbName, opts)
//-----------mongoose.connect(process.env.DB_HOST, process.env.DB_NAME, parseInt(process.env.DB_PORT, 10),  opts);
//---multi connect -------
//-------db = mongoose.createConnection(process.env.DB_HOST, process.env.DB_NAME, parseInt(process.env.DB_PORT, 10),  opts);
mongoose.connect(process.env.DB_HOST, process.env.DB_NAME, parseInt(process.env.DB_PORT, 10),  opts);
db = mongoose.connection;
db.once('connected', function(){
    var userRouter = require('./routes/user');
    process.env.NODE_ENV = 'production';
    console.log('Connected to', '*testlocal*');

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 200}));

    app.use(express.static(staticUrl));
    app.get('/', function(req, res, next){
        console.log(req.logged);
        res.sendfile('index.html');
    });

    app.use('/myApi/user', userRouter);

    app.listen(3030);
});
db.on('error', function(err){
    console.error(err);
});


