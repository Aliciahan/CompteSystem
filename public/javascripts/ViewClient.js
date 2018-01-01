app.controller('ViewClient', ['$scope', '$http', 'Piao', '$uibModal', function($scope, $http, Piao, $uibModal) {

    $scope.focusingPiao = {
        "idNum": "请填写票号",
        "bank": "ICBC",
        "type": "dianpiao",
        "amount": 8888,
        "endDate": "1970-01-18",
        "addDate": "1970-01-18",
        "isSold": false,
        "soldDate": "1970-01-18",
        "headerPhoto": ""
    };
    npm

    $scope.piaos = Piao.piaos;

    $scope.getCurrentPiaos = function() {
        Piao.getAllCurrent();
        console.log($scope.piaos);
    };

    $scope.getFocus = function(piaoId) {
        $scope.focusingPiao = Piao.getById(piaoId);
    };

    $scope.popupDetail = function(piaoId) {
        var parentElem = undefined;
        var modalInst = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'viewSinglePiao.html',
            controller: 'ViewClientCtrl',
            size: 'lg',
            scope: $scope,
            resolve: {
                item: function() {
                    return piaoId;
                }
            }
        });

    };
}]);