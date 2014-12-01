(function(){
  'use strict';

  angular.module('hapi-auth')
    .factory('User', ['$rootScope', '$http', function($rootScope, $http){

      $rootScope.$watch('rootuser', function(user){
        if(user){
          socket.connect();
        }else{
          socket.disconnect();
          $rootScope.online = false;
        }
      });

      function register(user){
        return $http.post('/register', user);
      }

      function login(user){
        return $http.post('/login', user);
      }

      function logout(){
        return $http.delete('/logout');
      }

      return {register:register, login:login, logout:logout};
    }]);
})();
