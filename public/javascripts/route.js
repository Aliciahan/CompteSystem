//angular.module('frontapp')
app.config(
   function($stateProvider, $interpolateProvider, $urlRouterProvider){
    $interpolateProvider.startSymbol('{{');
    $interpolateProvider.endSymbol('}}');

    $stateProvider.state('root', {
      url:'',
      templateUrl: './templates/navbar.html',
      controller: 'AuthCtrl',
    });

    $stateProvider
      .state('root.home',{
        url: '/home',
        templateUrl: "./templates/home.html",
        controller: '',
        onEnter:['$state', 'auth', function($state,auth){
          if(auth.isLoggedin()){
            $state.go('root.home');
          }
        }]
      });

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: "./templates/login.html",
        controller: 'AuthCtrl',
        onEnter:['$state', 'auth', function($state,auth){
          if(auth.isLoggedin()){
            $state.go('root.home');
          }
        }]
      });

    $stateProvider
      .state('registry',{
        url:'/registry',
        templateUrl: "./templates/registry.html",
        controller: 'AuthCtrl',
        onEnter:['$state', 'auth', function($state, auth){
          if(auth.isLoggedin()){
            $state.go('root.home');
          }
        }]
      });

    $stateProvider
      .state('admin-reg',{
        url:'/admin-reg',
        templateUrl: "./templates/admin-reg.html",
        controller: 'AuthCtrl',
        onEnter:['$state', 'auth', function($state, auth){
          if(auth.isLoggedin()){
            $state.go('root.home');
          }
        }]
      });

    $stateProvider
     .state('root.piao', {
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
     .state('root.create', {
       url: '/create',
       templateUrl: './templates/createPiao.html',
       controller: 'CreatePiao',
     });

     $stateProvider
       .state('root.viewclient',{
         url: '/viewclient',
         templateUrl: './templates/viewClient.html',
         controller: 'ViewClient'
       });
     $stateProvider
       .state('root.check',{
         url: '/check',
         templateUrl: './templates/check.html',
         controller: 'CheckCtrl',
         resolve:{
           postPromise:['Piao', function(Piao){
             return Piao.getAllCurrent();
           }]
         }
       });


    $urlRouterProvider.otherwise('home')

  }
);

