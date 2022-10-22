angular.module('userApp', ['appRoutes', 'userControllers', 'userServices', 'ngRoute', 'mainController','authServices']) // module name and any dependencies // ngRoute


.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
})

// var userApp = angular.module('userApp', ['ngAnimate', 'ui.router', 'appRoutes', 'userControllers', 'userServices']);


var formApp = angular.module('formApp', ['ngAnimate', 'ui.router', 'formCtrl']); // Module name and any dependencies

