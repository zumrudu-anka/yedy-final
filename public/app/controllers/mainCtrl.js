angular
  .module("mainController", ["authServices"])

  .controller("mainCtrl", function (Auth, $timeout, $location,  $rootScope) {
    //factory 'Auth'

    var app = this;

    app.loadme = false; // hide the html until this becomes true, to slow internet preventing
    //  <body ng-controller="mainCtrl as main" ng-app="userApp" ng-show="main.loadme" ng-cloak>

    // every time the view changes invoke the function
    $rootScope.$on('$routeChangeStart', function () {

      if (Auth.isLoggedIn()) {
        console.log("Success: User is logged in");
        app.isLoggedIn = true;

        Auth.getUser().then(function (data) {
          console.log(data.data.username);
          app.username = data.data.username;
          app.useremail = data.data.email;
          app.loadme = true;
        });
      } else {
        console.log("Failure: User is NOT logged in");
        app.isLoggedIn = false;
        app.username = null;
        app.loadme = true;
      }
    });

    this.doLogin = function (loginData) {
      app.loading = true;
      app.errorMsg = false;

      Auth.login(app.loginData).then(function (data) {
        //   $http.post("/api/users", this.regData).then(function (data) {

        // console.log(data.data.success);
        // console.log(data.data.message);
        if (data.data.success) {
          app.loading = false;

          //create success message
          app.successMsg = data.data.message + " Redirecting...";
          //   <div class="alert alert-success">{{ register.successMsg }}</div>

          $timeout(function () {
            //delay for 2 seconds after submitting the form
            $location.path("/profile"); // after submitting send to home page
            //clear the credentials in the login form after logged in
            app.loginData = null;
            app.successMsg = false;
          }, 2000);
        } else {
          // create an error message
          app.loading = false;
          app.errorMsg = data.data.message;
        }
      });
    };

    this.logout = function () {
      Auth.logout();
      // $location.path("/logout");
      
      $timeout(function () {
        //delay for 2 seconds after submitting the form
        $location.path("/home"); // after submitting send to home page
      }, 2000);
    };
  });
