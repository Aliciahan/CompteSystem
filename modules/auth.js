var jwt = require('express-jwt');
var User = require('../models/user');


var config = require('../config.json');


function Auth(){
  this.verify = Auth.verify;
  this.onDone = Auth.onDone;
  this.jwt = Auth.jwt;
}

Auth.verify = function(username, password, done) {
  User.findOne({username: username.toLowerCase()},
    function onUserFoundForAuth(error, user){
    if(error) return done(error);

    if (!user)
      return done(null, false, {message: 'Invalid credentials'});

    done(null, user);
    });
};

Auth.onDone =function(req, res, next) {
  return function(error, user, info, status){
    if(error) return next(error);

    if (!user) {
      var message = (status === 400)
        ? 'Bad Request: '
        : 'Unauthorized: ';
      message += info.message;

      var err = new Error(message);
      err.status = status || 401;
      return next(err);
    }

    req.user = user;
    next();
  };
};


Auth.jwt = jwt({
  secret: config.auth.secret,
  requestProperty: 'jwt',
  credentialsRequired: false
});

module.exports = Auth;




