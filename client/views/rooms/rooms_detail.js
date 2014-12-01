(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('RoomsDetailCtrl', ['$rootScope', '$scope', '$state', 'Room', 'Game', function($rootScope, $scope, $state, Room, Game){
      $scope.messages = [];
      $scope.players = {};

      $scope.hit = function(){
        socket.emit('hit', {roomId: $state.params.roomId});
      };

      socket.off('hit');
      socket.on('hit', function(data){
        if($scope.isPlaying){
          $scope.players[data.player.username] = data;
          $scope.$digest();
        }
      });

      $scope.hold = function(){
      };

      Game.readyNewGame($state.params.roomId).then(function(){
       $scope.readyNewGame = true;
      });

      Game.readyJoinGame($state.params.roomId).then(function(){
        $scope.readyJoinGame = true;
      });

      Game.isPlaying($state.params.roomId).then(function(){
        $scope.isPlaying = true;
      });

      Room.show($state.params.roomId).then(function(response){
        $scope.room = response.data;
      });

      $scope.newGame = function(){
        Game.newGame($state.params.roomId).then(function(){
          $scope.readyNewGame = false;
          socket.emit('readyJoinGame', {roomId: $state.params.roomId});
        });
      };

      socket.off('readyJoinGame');
      socket.on('readyJoinGame', function(data){
        $scope.readyJoinGame = true;
        $scope.$digest();
      });

      $scope.joinGame = function(){
        Game.joinGame($state.params.roomId);
      };

      $scope.startGame = function(){
        Game.startGame($state.params.roomId).then(function(){
          socket.emit('startGame', {roomId:$state.params.roomId});
        });
      };

      socket.off('startGame');
      socket.on('startGame', function(data){
        $state.reload();
      });

      socket.emit('joinRoom', {roomId:$state.params.roomId});

      $scope.chat = function(msg){
        socket.emit('roomChat', {roomId: $state.params.roomId, avatar:$rootScope.rootuser.avatar, content:msg});
      };

      socket.off('roomChat');
      socket.on('roomChat', function(data){
        $scope.messages.unshift(data);
        $scope.messages = $scope.messages.slice(0, 100);
        $scope.message = null;
        $('#message').focus();
        $scope.$digest();
      });
    }]);
})();
