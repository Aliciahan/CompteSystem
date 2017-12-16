angular.module('frontapp').controller('AuthCtrl',['$scope','auth','$state', '$window', function($scope,auth,$state,$window){

  $scope.isLoggedin = auth.isLoggedin();
  $scope.currentUser = auth.current;
  $scope.logOut = auth.logOut;

  $scope.user={};

  $scope.register = function(){
    auth.register($scope.user).error(function(err){
      $scope.error=err;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.adminreg = function(){
    $scope.user.role = 'admin';
    auth.adminreg($scope.user).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).then(function(){
      $state.go('root.home');
    });
  };

  $scope.logOut = function(){
    $window.localStorage.clear().resolve(function(){
      $state.go('root.home');
    });
    // auth.logOut().then(function(){
    //   $state.go('root.home');
    // });
  };

}]);
