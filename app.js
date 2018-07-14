var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./public/routes');

    
var bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    errorHandler = require('errorhandler');

var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));


if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.get("/",routes.index);


http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
   console.log('Express server listening on port ' + app.get('port'));
});