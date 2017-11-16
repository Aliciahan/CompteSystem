// Controller for Nav Bar in route /nav


angular.module('frontapp').controller('NavCtrl',['$scope','auth', function($scope,auth){

  $scope.isLoggedin = auth.isLoggedin;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;


}]);

