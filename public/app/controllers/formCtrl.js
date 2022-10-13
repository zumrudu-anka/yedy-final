
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router', 'formServices'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)   

        .state('form.area', {
            url: '/area',
            templateUrl: 'form-area.html'
        })

        // url will be nested (/form/responsive)
        .state('form.responsive', {
            url: '/responsive',
            templateUrl: 'form-responsive.html'
        })

        // url will be nested (/form/name)
        .state('form.name', {
            url: '/name',
            templateUrl: 'form-name.html'
        })

        // url will be nested (/form/tema)
        .state('form.tema', {
            url: '/tema',
            templateUrl: 'form-tema.html'
        })
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/area');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope, $http, Form) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    // $scope.processForm = function() {

    // };

    var app = this;


    this.regForm = function(formData){

        app.loading = true;
        app.errorMsg = false;

        Form.create(app.regForm).then(function(formData){
            if(formData.data.success){
                app.loading = false;

                //create success message
                app.successMsg = formData.data.message = "...Redirecting";
            
                $timeout(function(){
                    //delay for 2 seconds after submitting the form
                    $location.path("/"); //send to home page after submitting
                }, 2000);
            }else{
                //crete error message
                app.loading = false;
                app.errorMsg = formData.data.message;
            }
        });
    }



    
    
});

