angular.module('frontapp').controller('AuthCtrl', ['$scope', 'auth', '$state', '$window', function($scope, auth, $state, $window) {

    $scope.isLoggedin = auth.isLoggedin();
    $scope.currentUser = auth.current;
    $scope.isAdmin = auth.isAdmin();

    $scope.user = {};

    $scope.register = function() {
        auth.register($scope.user).then(function() {
            $state.go('root.kucun');
        });
    };

    $scope.adminreg = function() {
        $scope.user.role = 'admin';
        auth.adminreg($scope.user).then(function() {
            $state.go('root.kucun');
        });
    };

    $scope.logIn = function() {
        auth.logIn($scope.user).then(function() {
            location.reload();
        });
    };

    function sleep(delay) {
        return function() {
            return new Promise(function(resolve, reject) {
                setTimeout(resolve, delay);
            });
        }
    }

}]);