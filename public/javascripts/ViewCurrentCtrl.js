app.controller('ViewCurrentCtrl', function($scope, $uibModalInstance, Piao, item) {

    $scope.currentPiao = Piao.one;
    Piao.getById(item);

    $scope.continue = function() {
        $uibModalInstance.close();
    };

    $scope.getpiao = function() {
        console.log("context:" + $scope.currentPiao);
    }
});