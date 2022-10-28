var app = angular
.module("appRoutes", ["ngRoute"]) // module name and any dependencies
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider

      .when("/home", {
        // when user type in default location
        templateUrl: "app/views/pages/home.html"
      })

      .when("/register", {
        templateUrl: "app/views/pages/users/register.html",
        controller: "regCtrl",
        controllerAs: "register",
        authenticated: false
      })

      .when("/about", {
        templateUrl: "app/views/pages/about.html"
      })

      .when("/login", {
        templateUrl: "app/views/pages/users/login.html",
        authenticated: false
      })

      .when("/logout", {
        templateUrl: "app/views/pages/users/logout.html",
        authenticated: true
      })

      .when('/profile', {
        templateUrl: 'app/views/pages/users/profile.html',
        authenticated: true
      })

      .when('/error', {
        templateUrl: "app/views/pages/error.html",
      })



      .otherwise({ redirectTo: "/error" });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
    });
  });



  //to avoid routes for authenticated users
  app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){
    $rootScope.$on('$routeChangeStart', function(event, next, current){
      if(next.$$route.authenticated == true){ //if they need to be logged in
          if(!Auth.isLoggedIn()){ //if user not logged in
            event.preventDefault(); //prevent to go to that route
            $location.path('/register'); // and redirect them to register page
          }
      }else if (next.$$route.authenticated == false){ //if they dont need to be logged in
          if(Auth.isLoggedIn()){
            event.preventDefault();
            $location.path('/profile');
          }
      }else{
        console.log('authentication does not matter');
      }
    });
  }]);