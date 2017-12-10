app.controller('ModalInstanceCtrl', function($uibModalInstance, Piao, $http, $scope){

  var $ctrl = this;
  $ctrl.pendingPiao = {
    "idNum": "---",
    "bank": "---",
    "type": "---",
    "amount": "---",
    "endDate": "1970-01-18T11:55:31.965Z",
    "addDate": "1970-01-18T11:55:15.668Z"
  };

  $ctrl.Committed = false;


  $http({
    method: "GET",
    url: "../piao/" + Piao.piaos.pop()._id})
    .then(function(res){
      $ctrl.pendingPiao.idNum=res.data.idNum;
      $ctrl.pendingPiao.bank = res.data.bank;
      $ctrl.pendingPiao.type = res.data.type;
      $ctrl.pendingPiao.amount = res.data.amount;
      $ctrl.pendingPiao.addData = res.data.addDate;
      $ctrl.pendingPiao.endDate = res.data.endDate;
      $ctrl.pendingPiao.headerPhoto = res.data.headerPhoto;
      $scope.pendingPiao=res.data;
      Piao.piaos.push(res.data);
      console.log($ctrl.pendingPiao.idNum.toString());

    }, function(){
      $ctrl.Committed=false;
    });

  $ctrl.continue = function(){
    $uibModalInstance.close()
  };
  $ctrl.exit = function(){
    $uibModalInstance.dismiss();
  }

});