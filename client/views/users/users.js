(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('UsersCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      $scope.user = {};
      $scope.mode = $state.current.name;

      $scope.submit = function(){
        if($scope.mode === 'register'){
          User.register($scope.user).then(function(response){
            toastr.success('User successfully registered.');
            $state.go('login');
          }, function(){
            toastr.error('Error during registration.');
            $scope.user = {};
          });
        }else{
          User.login($scope.user).then(function(response){
            $rootScope.rootuser = response.data;
            toastr.success('User successfully authenticated.');
            $state.go('home');
          }, function(){
            toastr.error('Error during authentication.');
            $scope.user = {};
          });
        }
      };
    }]);
})();
