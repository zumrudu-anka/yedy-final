angular
  .module("appRoutes", ["ngRoute"]) // module name and any dependencies
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider

      .when("/home", {
        // when user type in default location
        templateUrl: "app/views/pages/home.html",
      })

      .when("/register", {
        templateUrl: "app/views/pages/users/register.html",
        controller: "regCtrl",
        controllerAs: "register",
      })

      .when("/about", {
        templateUrl: "app/views/pages/about.html",
      })

      .when("/login", {
        templateUrl: "app/views/pages/users/login.html",
      })

      .when("/logout", {
        templateUrl: "app/views/pages/users/logout.html"
      })

      .when('/profile', {
        templateUrl: 'app/views/pages/users/profile.html'
      })

      .otherwise({ redirectTo: "/home" });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
    });
  });

// angular.module("userApp", ["ngAnimate", "ui.router"])

// .config(function($stateProvider, $urlRouterProvider){

//     $stateProvider

//     .state("home",{
//         url: "/home",
//         templateUrl: "home.html",
//     })

//     .state("register", {
//         url: "/register",
//         templateUrl: "register.html",
//         controller: "regCtrl"
//     })

//     .state("about",{
//         url: "/about",
//         templateUrl: "about.html"
//     });

//     $urlRouterProvider.otherwise("/home");

// });
