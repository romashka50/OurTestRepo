var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var crypto = require('crypto');
var app = express();
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var staticUrl = path.join(__dirname, 'public');
var session = require('express-session');
var SessionStorage = require('connect-mongo')(session);
var socket = require('socket.io');
var io;

var myStack = function (req, res, next) {
    console.log('my custom stackMidlware for /kill');

    next();
};
var env = process.env.NODE_ENV || 'development';
var connectionStr;
var db;
var opts;
var server;

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
mongoose.connect(process.env.DB_HOST, process.env.DB_NAME, parseInt(process.env.DB_PORT, 10), opts);
db = mongoose.connection;
db.once('connected', function () {
    var userRouter = require('./routes/user');

    function onlyAuth(req, res, next){
        if(req.session && req.session.loggedIn){
            return next();
        }

        res.status(401).send();
    };

    process.env.NODE_ENV = 'production';
    console.log('Connected to', '*testlocal*');

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 200}));

    app.use(express.static(staticUrl));
    app.use(session({
        name             : 'testApp',
        key              : "myKey",
        secret           : 'dfhjky4356sjdfbeuy64t5873yfkjshdf98349erfkdhfg984ytkdfh',
        resave           : false,
        saveUninitialized: false,
        store            : new SessionStorage({
            mongooseConnection: db
        })
    }));
    app.get('/', function (req, res, next) {
        console.log(req.logged);
        res.sendfile('index.html');
    });

    app.use('/myApi/user', onlyAuth, userRouter);

    app.post('/login', function (req, res, next) {
        var body = req.body;
        var shaSum;
        var UserModel = mongoose.model('user');

        if (body.password && body.login) {
            UserModel.findOne({
                'name.first': body.login
            }, function (err, user) {
                if (err) {
                    next(err);
                }
                shaSum = crypto.createHash('sha256');
                shaSum.update(body.password);
                body.password = shaSum.digest('hex');

                if (user && user.password === body.password) {
                    req.session.loggedIn = true;
                    req.session.userId = user._id;

                    return res.status(200).send({success: 'LoggedIn'});
                }

                err = new Error();
                err.status = 400;
                next(err);
            });
        }
    });

    app.post('/logout', function (req, res, next) {
       req.session.destroy();

        res.status(200).send();
    });
    server = http.createServer(app);
    io = socket(server);
    io.set('transports', [
        'websocket',
        'polling',
        'xhr-polling'
    ]);
    io.on('connection', function(socket){
        socket.emit('myServer', 'myCustomMsg');
    });
    server.listen(3030);
});
db.on('error', function (err) {
    console.error(err);
});


