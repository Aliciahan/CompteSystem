app.controller('ViewCurrent', ['$scope', '$http', 'Piao', '$uibModal', function($scope, $http, Piao, $uibModal) {
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

    vm.piaos = Piao.piaos;
    vm.countTotal;
    vm.amountTotal;

    vm.getCurrentPiaos = function() {
        Piao.getAllCurrent();
        console.log(vm.piaos);
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

    vm.delPiao = function(piaoId) {
        if (confirm('你确定一定以及肯定么?')) {
            Piao.delOneById(piaoId);
        } else {

        }
    }

    vm.getCurrentPiaos();

}]);