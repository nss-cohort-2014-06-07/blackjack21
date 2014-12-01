'use strict';

var Game = require('../models/game'),
    Card = require('../models/card');

module.exports = function(data){
  var socket = this;
  socket.to(data.roomId).emit('startGame');
  socket.emit('startGame');

  Game.findOne({room: data.roomId, inProgress: true, isOpen: false}, function(err, game){
    Card.find({}, '_id', function(err, cards){
      game.cards = cards.map(function(c){return c._id;});
      game.save();
    });
  });
};
