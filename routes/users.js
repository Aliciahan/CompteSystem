var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var RateLimit = require('express-rate-limit');



var Checks = require('../modules/checks');
var Utils = require('../modules/utils');

// Mount Schema
var User = require('../models/user');

// Read config
var config = require('../config.json');

var router = express.Router();

// Registration rate limiter
var registrationWs = config.rateLimiter.registration.windowSizeMin;
var registrationLimiter = new RateLimit({
  windowMs: registrationWs * 60 * 1000,
  max: config.rateLimiter.registration.max,
  delayMs: 0,
  message: 'Too many registrations from this IP. Please retry in '
  + registrationWs + ' minutes'
});


// Login rate limiter
var loginWs = config.rateLimiter.login.windowSizeMin;
var loginLimiter = new RateLimit({
  windowMs: loginWs * 60 * 1000,
  delayAfter: 1,
  delayMs: 2 * 1000,
  max: config.rateLimiter.login.max,
  message: 'Too many login attemps from this IP. Please retry in ' + loginWs
  + ' minutes'
});


// Which triggered only once.
router.param('id', Checks.isValidObjectId); // verify the ID is valid
router.param('id', Checks.db); //verify the db connection is good
router.param('id', getUser); // get current user.



router.get('/register', registrationLimiter, Checks.db, register, sendToken);



/* GET users listing. */
router.get('/',
  Checks.auth('admin'),
  Checks.db,
  getUsers);

// getUserInfo
router.get('/:id',
  Checks.auth('admin'),
  getUserInfo);

// createUser
router.post('/',
//  Checks.auth('client'),
  Checks.db,
  createUser,
  Utils.cleanEntityToSend(['passwordSalt', 'passwordHash']),
  Utils.send);

// updateUser
router.put('/:id',
  Checks.auth('admin'),
  updateUser,
  Utils.cleanEntityToSend(['passwordSalt', 'passwordHash']),
  Utils.send);

// deleteUser
router.delete('/:id',
  Checks.auth('admin'),
  deleteUser);



function getUsers(req, res, next) {
  var order = 'username';
  var page = 1;
  var n = 0;

  if (req.query.order) {
    switch (req.query.order) {
      case 'username':
        break;

      case 'username-desc':
        order = '-username';
        break;

      case 'date':
        order = 'date';
        break;

      case 'date-desc':
        order = '-date';
        break;

      default:
        var err = new Error('Bad Request: order must be in [username, '
          + 'username-desc, date, date-desc]');
        err.status = 400
        return next(err);
    }
  }

  if (req.query.page) {
    page = parseInt(req.query.page)

    if (isNaN(page)) {
      var err = new Error('Bad Request: page must be an integer');
      err.status = 400;
      return next(err);
    }

    if (page <= 0) {
      var err = new Error('Bad Request: page must be strictly positive');
      err.status = 400;
      return next(err);
    }

    n = 25;
  }

  if (req.query.n) {
    n = parseInt(req.query.n);

    if (isNaN(n)) {
      var err = new Error('Bad Request: n must be an integer');
      err.status = 400;
      return next(err);
    }

    if (n <= 0) {
      var err = new Error('Bad Request: n must be strictly positive');
      err.status = 400;
      return next(err);
    }
  }

  User.find({}, { __v: false, passwordSalt: false, passwordHash: false })
    .sort(order)
    .skip((page - 1) * n)
    .limit(n)
    .exec(function returnUsers(error, users) {
      if (error) return next(error);
      res.json(users);
    });
}


function getUser(req, res, next, id) {
  var options = {
    __v: false,
    passwordSalt: false,
    passwordHash: false
  };

  User.findById(id, options, function onUserFound(error, user) {
    if (error) return next(error);

    if (!user) {
      var err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }

    req.user = user;
    req.owner = user._id;

    next();
  });
}


function getUserInfo(req, res, next) {
  res.json(req.user);
}


function createUser(req, res, next) {
  // Delete unchangable attributes
  delete req.body._id;
  delete req.body.__v;
  delete req.body.passwordSalt;
  delete req.body.passwordHash;

  var user = new User(req.body);

  var onUserSaved = Utils.returnSavedEntity(req, res, next, 201);
  user.save(onUserSaved);
}


function updateUser(req, res, next) {
  var user = req.user;
  var changes = req.body;
  var role = req.jwt.role;

  if (role !== 'admin' && changes.role) {
    var err = new Error('Forbidden: Unsufficient permissions to change the '
      + 'role');
    err.status = 403;
    return next(err);
  }

  // Delete unchangeable attributes
  delete changes._id;
  delete changes.__v;
  delete changes.username;
  delete changes.passwordSalt;
  delete changes.passwordHash;

  for (attribute in changes)
    user[attribute] = changes[attribute];

  var onUserSaved = Utils.returnSavedEntity(req, res, next);
  user.save(onUserSaved);
}


function deleteUser(req, res, next) {
  var user = req.user;

  user.remove(function onUserRemoved(error) {
    if (error) return next(error);
    res.status(204).end();
  });
}


function register(req, res, next) {
  if (!req.body.username) {
    var err = new Error('Bad Request: username is missing');
    err.status = 400;
    return next(err);
  }

  if (!req.body.password) {
    var err = new Error('Bad Request: password is missing');
    err.status = 400;
    return next(err);
  }

  if (!req.body.email) {
    var err = new Error('Bad Request: email is missing');
    err.status = 400;
    return next(err);
  }

  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  user.save(function onUserRegistered(error) {
    if (error) return next(error);

    req.user = user;
    next();
  });
}


function login(req, res, next) {
  var onAuthDone = Auth.onDone(req, res, next);
  var auth = passport.authenticate('local', { session: false }, onAuthDone);

  auth(req, res, next);
}


function sendToken(req, res, next) {
  res.json({ token: req.user.generateJWT() });
}



module.exports = router;
