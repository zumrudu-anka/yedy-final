// angular.module('formServices', [])
// .factory('Form', function($http){
//     formFactory = {};

//     formFactory.create = function(formData){
//         return $http.post('/api/forms', formData);
//     }
//     return formFactory;
// });



// var formService = angular.module('formService', [])
// .service('saveForm', function($resource){
//     var form = $resource.('api/form', formData);
//     var formData = "";


// })


angular.module('formServices',[])
.factory('Form', function($http){
    var formFactory = {};

    formFactory.create = function(formData){
        return $http.post('/api/forms', formData);
    }

    return formFactory;
});