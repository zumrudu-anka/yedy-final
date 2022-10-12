
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])

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
.controller('formController', function($scope) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        
    };
    
});

