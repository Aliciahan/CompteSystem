app.controller('ViewCurrentClient', ['$scope', '$http', 'Piao', '$uibModal', function($scope, $http, Piao, $uibModal) {
    var vm = $scope;

    vm.focusingPiao = {
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

  var getAmountTotal = function(){
    var total =0;
    Piao.piaos.forEach(function(item){
      total += item.amount;
      console.log("we are here!"+item.amount);
    });
    vm.amountTotal = total;
  };

  vm.piaos = Piao.piaos;
    vm.amountTotal;



  function sleep(delay){
    return function(){
      return new Promise(function(resolve,reject){
        setTimeout(resolve,delay);
      });
    }
  }

    vm.getCurrentPiaos = function() {
        Piao.getAllCurrent().then(function(){
          getAmountTotal();
        });
    };

    vm.getFocus = function(piaoId) {
        vm.focusingPiao = Piao.getById(piaoId);
    };


    vm.popupDetail = function(piaoId) {
        var parentElem = undefined;
        var modalInst = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'viewSinglePiao.html',
            controller: 'ViewCurrentCtrl',
            size: 'lg',
            scope: vm,
            resolve: {
                item: function() {
                    return piaoId;
                }
            }
        });

    };

    vm.popupModify = function(piaoId) {
        var parentElem = undefined;
        var modalInst = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modifySinglePiao.html',
            controller: 'ModifyCurrentCtrl',
            size: 'lg',
            scope: vm,
            resolve: {
                item: function() {
                    return piaoId;
                }
            }
        });
    };

    vm.delPiao = function(piaoId) {
        if (confirm('你确定一定以及肯定么?')) {
            Piao.delOneById(piaoId);
        } else {

        }
    };

    vm.getCurrentPiaoAmountUp = function(){
      Piao.getAllCurrent("amount-ace");

    };
    vm.getCurrentPiaoAmountDown = function(){
      Piao.getAllCurrent("amount-desc");
    };

    vm.getCurrentPiaos();



}]);