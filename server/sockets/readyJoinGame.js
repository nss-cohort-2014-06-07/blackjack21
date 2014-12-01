'use strict';

module.exports = function(data){
  var socket = this;
  socket.to(data.roomId).emit('readyJoinGame', data);
  socket.emit('readyJoinGame', data);
};
