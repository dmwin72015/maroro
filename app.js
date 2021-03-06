var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var laytpl = require('laytpl');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');


var routes = require('./routes/index');
var users = require('./routes/users');
var weixin = require('./routes/weixin');
var bg = require('./routes/bg');
var note = require('./routes/note');
var app = express();

// view engine setup 模板设置
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
laytpl.config({
    cache: false,
    min: true
});
app.engine('.html', laytpl.__express);
app.set('view engine', 'html');

/****设置日志存放位置****
var logDirectory = __dirname + '/logs';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
})
app.use(logger(':remote-addr【:date】:method┇:url┇:response-time ms ', { stream: accessLogStream, }));
*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'), {
    'index': '/resume/resume.html'
}));

app.use('/', routes);
app.use('/users', users);
app.use('/admin', bg);
app.use('/api', note);
app.use('/weixin', weixin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/****error handlers****/

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: err.status,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: err.status,
        message: err.message,
        error: {}
    });
});


module.exports = app;
