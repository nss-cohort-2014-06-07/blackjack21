'use strict';

module.exports = function(data){
  var socket = this;
  socket.emit('globalChat', data);
  socket.broadcast.emit('globalChat', data);
};
