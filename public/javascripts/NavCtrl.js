// Controller for Nav Bar in route /nav


angular.module('frontapp').controller('NavCtrl', ['$scope', 'auth', '$state', function($scope, auth, $state) {

    $scope.isLoggedin = auth.isLoggedin();
    $scope.currentUser = auth.current;
    $scope.isAdmin = auth.isAdmin();
    $state.transitionTo('root.kucun');

    $scope.out = function() {
        //$window.localStorage.clear().resolve(function(){
        //  $state.go('root.home');
        //});
        // $scope.logout().then(function(){
        //    $state.go('root.home');
        // });
        var promise = new Promise(function(resolve) {
            auth.finished();
            resolve();
        }).then(function() {
            //$state.go('root.home');
            location.reload();
        });
    };
}]);