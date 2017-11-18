// Main Entry of Angular
//Here I put all the data modules of what we are going to use.


var app = angular.module('frontapp', ["ui.router", "ui.bootstrap", "ngAnimate", "ngSanitize", "base64"]);

app.factory('auth', ['$http', '$window', function ($http, $window){

  var auth = {};


  auth.saveToken = function(token){
    $window.localStorage['inscription-token'] = token;
  };


  auth.getToken = function() {
    return $window.localStorage['inscription-token'];
  };


  auth.isLoggedin = function() {
    var  token = auth.getToken();

    if (token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now()/1000;
    } else {
      return false
    }
  };

  auth.current = function(){
    if(auth.isLoggedin()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.usr;
    }
  };

  auth.register = function (user){
    return $http.post('http://localhost:3000/user/register', user).onSuccess(function(data){
      auth.saveToken(data.token);
    });
  };


  auth.logIn = function(user){
    return $http.post('http://localhost:3000/user/login',user).onSuccess(function(data){
      auth.saveToken(data.token);
    });
  };


  auth.logOut = function(){
    $window.localStorage.removeItem('inscription-token');
  };

  return auth;
}]);
