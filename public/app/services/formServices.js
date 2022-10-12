angular.module('formService', [])
.factory('Form', function($http){
    formFactory = {};

    formFactory.create = function(formData){
        return $http.post('/api/form', formData);
    }
    return formFactory;
});