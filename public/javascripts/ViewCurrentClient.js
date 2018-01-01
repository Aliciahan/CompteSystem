app.controller('ViewCurrentClient', ['$scope', '$http', 'Piao', '$uibModal', 'filterFilter', function($scope, $http, Piao, $uibModal, filterFilter) {
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

    var getAmountTotal = function() {
        var total = 0;
        vm.piaos.forEach(function(item) {
            total += item.amount;
        });
        vm.amountTotal = total;
    };

    vm.piaosServer = Piao.piaos;
    vm.piaos = Piao.piaos;
    vm.amountTotal;

    function sleep(delay) {
        return function() {
            return new Promise(function(resolve, reject) {
                setTimeout(resolve, delay);
            });
        }
    }

    vm.getCurrentPiaos = function() {
        Piao.getAllCurrent().then(function() {
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

    $scope.typeFilter = function(clientType) {
        if (clientType != '') {
            vm.piaos = filterFilter(vm.piaosServer, { type: clientType });
        } else {
            vm.piaos = vm.piaosServer;
        }
        getAmountTotal();
    };

    var orderByAmountUp = true;
    var orderByEndDateUp = true;
    var orderByType = true;
    var orderByBank = true;

    vm.orderByEndDate = function() {
        if (orderByEndDateUp) {
            Piao.getAllCurrent("endDate-ace");
            orderByEndDateUp = false;
        } else {
            Piao.getAllCurrent("endDate-desc");
            orderByEndDateUp = true;
        }
    };
    vm.orderByAmount = function() {
        if (orderByAmountUp) {
            Piao.getAllCurrent("amount-ace");
            orderByAmountUp = false;
        } else {
            Piao.getAllCurrent("amount-desc");
            orderByAmountUp = true;
        }
    };
    vm.orderByType = function() {
        if (orderByType) {
            Piao.getAllCurrent("type-ace");
            orderByType = false;
        } else {
            Piao.getAllCurrent("type-desc");
            orderByType = true;
        }
    };
    vm.orderByBank = function() {
        if (orderByBank) {
            Piao.getAllCurrent("bank-ace");
            orderByBank = false;
        } else {
            Piao.getAllCurrent("bank-desc");
            orderByBank = true;
        }
    };
    vm.getCurrentPiaos();
}]);