app.config(
    function($stateProvider, $interpolateProvider, $urlRouterProvider) {
        $interpolateProvider.startSymbol('{{');
        $interpolateProvider.endSymbol('}}');

        $stateProvider.state('root', {
            url: '',
            templateUrl: './templates/navbar.html',
            controller: 'NavCtrl'
        });

        $stateProvider.state('root.kucun', {
            url: '/kucun',
            templateUrl: './templates/clientView.html',
            controller: 'ViewCurrentClient',
            resolve: {
                postPromise: ['Piao', function(Piao) {
                    return Piao.getAllCurrent();
                }]
            }
        });

        // $stateProvider
        //     .state('root.home', {
        //         url: '/home',
        //         templateUrl: "./templates/home.html",
        //         controller: 'AuthCtrl',
        //         onEnter: ['$state', 'auth', function($state, auth) {
        //             if (auth.isLoggedin()) {
        //                 $state.go('root.home');
        //             }
        //         }]
        //     });

        $stateProvider
            .state('root.login', {
                url: '/login',
                templateUrl: "./templates/login.html",
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (auth.isLoggedin()) {
                        $state.go('root');
                    }
                }]
            });

        $stateProvider
            .state('root.registry', {
                url: '/registry',
                templateUrl: "./templates/registry.html",
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (auth.isLoggedin()) {
                        $state.go('root');
                    }
                }]
            });

        $stateProvider
            .state('admin-reg', {
                url: '/admin-reg',
                templateUrl: "./templates/admin-reg.html",
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (auth.isLoggedin()) {
                        $state.go('root');
                    }
                }]
            });

        $stateProvider
            .state('root.piao', {
                url: '/piao',
                templateUrl: './templates/piaoGetAll.html',
                controller: 'piaoGetAll',
                resolve: {
                    postPromise: ['Piao', function(Piao) {
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
            .state('root.piaos', {
                url: '/piaos',
                templateUrl: './templates/viewCurrent.html',
                controller: 'ViewCurrent'
            });

        $stateProvider
            .state('root.check', {
                url: '/check',
                templateUrl: './templates/check.html',
                controller: 'CheckCtrl',
                resolve: {
                    postPromise: ['Piao', function(Piao) {
                        return Piao.getAllCurrent();
                    }]
                }
            });
        $urlRouterProvider.otherwise('')
    }
);