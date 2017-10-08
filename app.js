const path = require('path')

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var engine = require('ejs-locals');


var breadcrumbs = require('express-breadcrumbs');

const app = express();
require('./authentication').init(app);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set breadcrumbs
app.use(breadcrumbs.init());
app.use(breadcrumbs.setHome());
app.set('models', require('./models'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.locals.moment = require('moment');

app.use(session({secret:'tfgbpg'}));
app.use(passport.initialize());
app.use(passport.session());


var index = require('./routes/index');
var clinicas = require('./routes/clinicas');
var public = require('./routes/public')

app.use('/', index);
app.use('/clinica', clinicas);
app.use('/public', public);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;