angular.module('frontapp').controller('AuthCtrl',['$scope','auth','$state', '$window', function($scope,auth,$state,$window){

  $scope.isLoggedin = auth.isLoggedin();
  $scope.currentUser = auth.current;
  $scope.isAdmin = auth.isAdmin();

  $scope.user={};

  $scope.register = function(){
    auth.register($scope.user).then(function(){
      $state.go('root.home');
    });
  };

  $scope.adminreg = function(){
    $scope.user.role = 'admin';
    auth.adminreg($scope.user).then(function(){
      $state.go('root.home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).then(function(){
      $state.go('root.home');
    });
  };

  function sleep(delay){
    return function(){
      return new Promise(function(resolve,reject){
        setTimeout(resolve,delay);
      });
    }
  }

  $scope.out = function(){
    //$window.localStorage.clear().resolve(function(){
    //  $state.go('root.home');
    //});
    // $scope.logout().then(function(){
    //    $state.go('root.home');
    // });
    var promise = new Promise(function(resolve){
      auth.finished();
      resolve();
    }).then(sleep(1000)).then(function(){
      //$state.go('root.home');
      location.reload();
    });
  };

}]);
