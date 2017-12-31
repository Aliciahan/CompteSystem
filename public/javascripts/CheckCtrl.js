angular.module('frontapp').controller('CheckCtrl', ['$scope', 'auth', '$http', 'Piao', function($scope, auth, $http, Piao) {

    $scope.result = [];
    $scope.piaos = Piao.piaos;
    $scope.ifShowProgressbar = false;
    $scope.check = function() {
        $scope.result = [];
        var i = 0;
        var end = $scope.piaos.length;
        $scope.max = end;
        $scope.ifShowProgressbar = true;

        function f() {
            checkOnePiao($scope.piaos[i].idNum);
            i++;
            $scope.dynamic = i;
            if (i < end) {
                setTimeout(f, 6000);
            } else {
                $scope.ifShowProgressbar = false;
            }
        }
        f();

    };

    var checkOnePiao = function(piaoID) {
        $http.get("../piao/check?idNum=" + piaoID).then(function(res) {
            if (res.data.toString()) {
                if (res.data.toString() === "errserver") {
                    $scope.result.push({
                        "piaoid": piaoID,
                        "info": "服务端出现问题, 请联系管理员",
                        "status": "black"
                    })
                } else {
                    $scope.result.push({
                        "piaoid": piaoID,
                        "info": "http://rmfygg.court.gov.cn/psca/lgnot/bulletin/" + piaoID + "_0_0.html",
                        "status": "red"

                    })
                }
            } else {
                $scope.result.push({
                    "piaoid": piaoID,
                    "info": "基本没有问题, 没有找到相关判决书或公示催告",
                    "status": "green"

                })
            }
        })
    }

}]);