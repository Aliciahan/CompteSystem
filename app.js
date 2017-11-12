var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var RateLimit = require('express-rate-limit');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var uploads = express.static('./uploads');
var static_files = express.static('./public');


var Auth = require('./modules/auth');


var config = require('./config.json');
var apiLimiter = new RateLimit({
  windowMs: config.rateLimiter.windowSize * 1000,
  max: config.rateLimiter.max,
  delayMs: 0,
});


//Declare routes
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.enable('strict routing');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.mongodb.uri, config.mongodb.options);
var db = mongoose.connection;
db.on('error', function onDBConnectionError(){
  console.error('无法连接到数据库, 退出...');
});
db.once('open', function onDBOpen(){
  console.log('Successfully connected.');
});

// Passport local str for auth
passport.use(new LocalStrategy(Auth.verify));


//Mount Modules:

app.use(cors());
app.use(apiLimiter);
app.use(passport.initialize());
app.use(Auth.jwt);
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'image/jpeg', limit: '5MB' }));
app.use(bodyParser.raw({ type: 'image/png', limit: '5MB' }));
app.use(bodyParser.raw({ type: 'text/plain', limit: '1MB' }));
app.use(bodyParser.raw({ type: 'application/pdf', limit: '10MB' }));
app.use(bodyParser.raw({ type: 'application/msword', limit: '5MB' }));
app.use(bodyParser.raw({ type: 'application/vnd.oasis.opendocument.text',
  limit: '5MB' }));

app.use('/', static_files);
app.use('/users', users);

app.get('/', function redirectToAdmin(req,res,next){
  res.redirect('public/');
});

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
