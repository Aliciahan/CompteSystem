var mongoose = require('mongoose');
var crypto =require('crypto');
var jwt = require('jsonwebtoken');


var Schema = mongoose.Schema;


var config = require('../config.json');

var pbkd = {
  iterations: 10000,
  keylen: 32,
  digest: 'sha256'
};

var userSchema = new Schema({
  username: {type: String, lowercase: true, unique: true, required: true},
  passwordSalt: {type: String, required: true},
  passwordHash: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  role: {
    type: String,
    enum: ['user', 'admin', 'employee']
  },
  registrationDate: {type: Date, default: Date.now, required: true}
});


userSchema.virtual('password').set(function (password){
  var salt = crypto.randomBytes(16).toString('base64');
  var hash = crypto.pbkdf2Sync(password, salt, pbkd.iterations, pbkd.keylen, pbkd.digest).toString('base64');

  this.passwordSalt = salt;
  this.passwordHash = hash;
});

userSchema.methods.generateJWT = function(){
  var payload = {
    _id : this._id,
    usr : this.username,
    role: this.role
  };

  var options = {
    expiresIn: config.auth.tokenValidity
  };

  var token = jwt.sign(payload, config.auth.secret, options);

  return token;
};


var User = mongoose.model('User', userSchema);

module.exports = User;