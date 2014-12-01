(function(){
  'use strict';

  angular.module('hapi-auth')
    .factory('Game', ['$rootScope', '$http', function($rootScope, $http){
      function readyNewGame(roomId){
        return $http.get('/rooms/' + roomId + '/readyNewGame');
      }

      function readyJoinGame(roomId){
        return $http.get('/rooms/' + roomId + '/readyJoinGame');
      }

      function newGame(roomId){
        return $http.post('/games', {roomId:roomId});
      }

      function joinGame(roomId){
        return $http.put('/games/join', {roomId:roomId});
      }

      function startGame(roomId){
        return $http.put('/games/start', {roomId:roomId});
      }

      function isPlaying(roomId){
        return $http.get('/games/' + roomId + '/isplaying');
      }

      return {readyNewGame:readyNewGame, readyJoinGame:readyJoinGame, newGame:newGame, joinGame:joinGame, startGame:startGame, isPlaying:isPlaying};
    }]);
})();
