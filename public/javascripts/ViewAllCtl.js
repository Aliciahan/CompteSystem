app.controller('ViewAllCtl', ['$scope', '$http', 'Piao', '$uibModal', function($scope, $http, Piao, $uibModal) {
    var vm = $scope;

    vm.focusingPiao = {
        "idNum": "",
        "bank": "",
        "type": "",
        "amount": 0,
        "endDate": new Date().setMonth(new Date().getMonth + 6),
        "addDate": new Date(),
        "isSold": false,
        "soldDate": null,
        "headerPhoto": ""
    };

    var getAmountTotal = function() {
        var total = 0;
        Piao.allPiaos.forEach(function(item) {
            total += item.amount;
        });
        vm.amountTotal = total;
    };

    vm.piaos = Piao.allPiaos;
    vm.amountTotal;

    vm.getCurrentPiaos = function() {
        Piao.getAll().then(function() {
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

    vm.getCurrentPiaos();

}]);