// Main Entry of Angular
//Here I put all the data modules of what we are going to use.


var app = angular.module('frontapp', ['ui.router', 'ngAnimate', 'ngSanitize', 'base64', 'ui.bootstrap']);


app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);





app.factory('fileReader', ["$q", "$log", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    }
  }

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();
    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);
    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
}
]);

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
    return $http.post('http://localhost:3000/user/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };


  auth.logIn = function(user){
    return $http.post('http://localhost:3000/user/login',user).success(function(data){
      auth.saveToken(data.token);
    });
  };


  auth.logOut = function(){
    $window.localStorage.removeItem('inscription-token');
  };

  return auth;
}]);


app.factory('Piao', ['$http','$base64',function($http, $base64){
  var piaoObject = {
    piaos : []
  };

  piaoObject.getAll = function(){
    return $http.get('../piao').then(function(res){
      angular.copy(res.data, piaoObject.piaos)
    }, function(res){
      console.log(res.data.toString());
    });
  };

  piaoObject.getAllCurrent = function(){
    return $http.get('../piao/currentpiaos').then(function(res){
      angular.copy(res.data, piaoObject.piaos)
    }, function(res){
      console.log(res.data.toString());
    });
  };

  piaoObject.create = function(piao){
    return $http({
      method: "POST",
      url: "../piao",
      data: piao
    }).then(function(res){
      piaoObject.piaos.push(res.data);
      alert("上传成功, 你可以点击右下方按钮查看");
    }, function(res){
      alert("上传失败" + res.data.toString());
    });
  };

  piaoObject.createPhoto = function(piao, picBin){
    return $http({
      method: "POST",
      url: "../piao",
      data: piao
    })
      .then(function(res){
      var sendUrl = '../upload/'+res.headers("Location").toString().split('/').pop();
      var fd = new FormData();
      fd.append('file', picBin );
      var ct = "image/";
      if ( picBin.name.split('.').pop()==='jpeg'|| picBin.name.split('.').pop()==='jpg' ){
        ct += 'jpeg'
      } else {
        ct+='png'
      }
      picBin.name = '@'+picBin.name;
      console.log("sendUrl :"+ sendUrl);
      $http({
        method: "PUT",
        url: sendUrl,
        data: picBin,
        headers: {
          "Content-Type": ct
        }
      })
        .then(function(res){
          piaoObject.piaos.push(res.data);
          console.log("upload success");
          alert("上传成功, 你可以点击右下方按钮查看");
        },
        function myError(res) {
          console.log("error");
          alert("上传失败"+res.data.toString());
        });
    });
  };
  return piaoObject;
}]);