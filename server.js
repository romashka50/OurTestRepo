var express = require('express');
var app = express();
var consolidate = require('consolidate');

app.use(express.static(__dirname + '/public'));

app.engine('html', consolidate.ejs);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res, next){
    res.render('index.html', {title: 'Hello World Rendered'});
});

app.post('/song', function(req, res, next){
    res.status(200).send({name: 'first song'});
});

app.listen(3030, function(){
    console.log('Server start listening on port', 3030);
});