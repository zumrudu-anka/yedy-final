angular
  .module("userControllers", ['userServices']) //for this module to work, need to add dependency in app.js to userApp.

  .controller("regCtrl", function ($http, $location, $timeout, User,) {
    //for the controller to work, need to add to route as controller
    var app = this;

    this.regUser = function (regData) {

      app.loading = true;

      app.errorMsg = false;

      // console.log('form submitted'); //for the function to work, need to add register.html as ng-submit="regUser()"
      // console.log(this.regData);

      User.create(app.regData).then(function (data) {
        //   $http.post("/api/users", this.regData).then(function (data) {

        // console.log(data.data.success);
        // console.log(data.data.message);
        if (data.data.success) {
          app.loading = false;
          //create success message
          app.successMsg = data.data.message + " Redirecting.."
          // redirect to home page
          //   <div class="alert alert-success">{{ register.successMsg }}</div>

          $timeout(function () {
            //delay for 2 seconds after submitting the form
            $location.path("/login"); // after submitting send to home page
          }, 2000);
        } else {
          // create an error message
          app.loading = false;
          app.errorMsg = data.data.message;
        }
      });
      
    };
  });
