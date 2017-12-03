//angular.module('frontapp')
app.config(
   function($stateProvider, $interpolateProvider, $urlRouterProvider){
    $interpolateProvider.startSymbol('{{');
    $interpolateProvider.endSymbol('}}');


    // $stateProvider
    //   .state('nav',{
    //     url: '/nav',
    //     templateUrl: './templates/navbar.html',
    //     controller: 'NavCtrl'
    //   });

    $stateProvider
     .state('piao', {
       url: '/piaos',
       templateUrl: './templates/piaoGetAll.html',
       controller: 'piaoGetAll',
       resolve:{
         postPromise:['Piao', function(Piao){
           return Piao.getAll();
         }]
       }
     });

     $stateProvider
     .state('create', {
       url: '/create',
       templateUrl: './templates/createPiao.html',
       controller: 'CreatePiao',
     });


    $urlRouterProvider.otherwise('create')

  }
);

