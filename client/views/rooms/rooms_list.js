(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('RoomsListCtrl', ['$rootScope', '$scope', '$state', 'Room', function($rootScope, $scope, $state, Room){
      $scope.messages = [];
      $scope.room = {};
      $scope.rooms = [];

      $scope.join = function(room){
        Room.join({name:room.name, password:this.password}).then(function(response){
          var roomId = response.data.roomId;
          $state.go('rooms.detail', {roomId:roomId});
        });
      };

      $scope.create = function(room){
        Room.create(room).then(function(response){
          $scope.rooms.push(response.data);
          $scope.room = {};
          $scope.error = false;
        }, function(){
          $scope.error = true;
        });
      };

      Room.all().then(function(response){
        $scope.rooms = response.data.rooms;
      });

      $scope.chat = function(msg){
        socket.emit('globalChat', {avatar:$rootScope.rootuser.avatar, content:msg});
      };

      socket.off('globalChat');
      socket.on('globalChat', function(data){
        $scope.messages.unshift(data);
        $scope.messages = $scope.messages.slice(0, 100);
        $scope.message = null;
        $('#message').focus();
        $scope.$digest();
      });
    }]);
})();
