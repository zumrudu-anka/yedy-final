angular.module('appRoutes', ['ngRoute'])  // module name and any dependencies
.config(function($routeProvider, $locationProvider){
    $routeProvider
    
    .when('/', { // when user type in default location  
        templateUrl: 'app/views/index.html'
    })

    .when('/register',{
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register'
    })

    .when('/about',{
        templateUrl: 'app/views/pages/about.html'
    })

    .otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
});