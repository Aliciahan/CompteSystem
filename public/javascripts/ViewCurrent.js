app.controller('ViewCurrent', ['$scope','$http', 'Piao', '$uibModal', function($scope, $http, Piao, $uibModal){

  $scope.focusingPiao={
    "idNum": "请填写票号",
    "bank": "ICBC",
    "type": "dianpiao",
    "amount": 8888,
    "endDate": "1970-01-18T11:55:31.965Z",
    "addDate": "1970-01-18T11:55:15.668Z",
    "isSold": false,
    "soldDate": "1970-01-18T11:55:15.668Z",
    "headerPhoto": ""
  };

  $scope.piaos= Piao.piaos;

  $scope.getCurrentPiaos = function(){
    Piao.getAllCurrent();
    console.log($scope.piaos);
  };

  $scope.getFocus = function(piaoId){
    Piao.getById()
  }




}]);