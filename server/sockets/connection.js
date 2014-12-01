'use strict';

module.exports = function(socket){
  socket.emit('online');
  socket.on('globalChat', require('./globalChat'));
  socket.on('joinRoom', require('./joinRoom'));
  socket.on('roomChat', require('./roomChat'));
  socket.on('readyJoinGame', require('./readyJoinGame'));
  socket.on('startGame', require('./startGame'));
  socket.on('hit', require('./hit'));

  // *** SOCKET LOGGING *** //
  console.log('Socket Connected:', socket.id);

  socket.on('disconnect', function(){
    console.log('Socket Disconnected:', socket.id);
  });

  console.log('Active Sockets:', this.sockets.length);
};
