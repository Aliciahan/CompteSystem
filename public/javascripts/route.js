angular.module('frontapp').config(
   function($stateProvider, $interpolateProvider, $urlRouterProvider){
    $interpolateProvider.startSymbol('{{');
    $interpolateProvider.endSymbol('}}');


    $stateProvider
      .state('nav',{
        url: '/nav',
        templateUrl: './templates/navbar.html',
        controller: 'NavCtrl'
      });

    $urlRouterProvider.otherwise('nav')

  }
);

