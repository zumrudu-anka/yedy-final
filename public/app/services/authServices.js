angular
.module('authServices', [])
.factory('Auth', function($http, AuthToken){
    var authFactory = {};

 
    authFactory.login = function(loginData){
        return $http.post('/api/authenticate', loginData).then(function(data){
            AuthToken.setToken(data.data.token);
            return data;
        });
    };

    // Auth.isLoggedIn();
    // get the token and check if there is token, if there is, means that user logged in
    authFactory.isLoggedIn = function(){
        if(AuthToken.getToken()){
            return true;
        }else{
            return false;
        }
    };


    //  Auth.getUser();
    authFactory.getUser = function(){
        if( AuthToken.getToken()){
            return $http.post('/api/currentUser');
        }else{
            // reject the request
            $q.reject({message: 'User has no token.'});
        }
    };


    //Auth.logout();
    authFactory.logout = function(){
        AuthToken.setToken();
    };

    return authFactory;
})

.factory('AuthToken', function($window){
    var authTokenFactory = {};

    // AuthToken.setToken(token);
    authTokenFactory.setToken = function(token){
        // $window.localStorage.setItem('token', token);

        if(token){
            $window.localStorage.setItem('token', token);
        }else{
            $window.localStorage.removeItem('token'); //       AuthToken.setToken(); it will remove the token

        }
    };

    // AuthToken.getToken(token);
    //when the page reloads get this token
    authTokenFactory.getToken = function(){ //if token not return, user is not logged in
        return $window.localStorage.getItem('token');
    };


    return authTokenFactory;
})


 // attach tokens to every request
.factory('AuthInterceptors', function(AuthToken){
    var authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(config){
        var token = AuthToken.getToken(); //get the token

        //if token is does exists, assign it to the headers
        if(token){
            config.headers['x-access-token'] = token;
        }
        return config;
    }


    return authInterceptorsFactory;
});



