'use strict';

module.exports = function(data){
  var socket = this;
  socket.to(data.roomId).emit('roomChat', data);
  socket.emit('roomChat', data);
};
