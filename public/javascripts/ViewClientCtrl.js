app.controller('ViewClientCtrl', function($scope, $uibModalInstance, Piao, item){

    $scope.currentPiao = Piao.one;
    Piao.getById(item);

    console.log("context:"+item.toString());

    $scope.continue = function(){
        $uibModalInstance.close();
    };

    $scope.getpiao = function(){
        console.log("context:"+$scope.currentPiao);
    }
});