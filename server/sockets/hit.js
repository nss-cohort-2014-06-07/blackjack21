'use strict';

var Iron = require('iron'),
    Game = require('../models/game');

module.exports = function(data){
  var socket = this,
      cookie = socket.handshake.headers.cookie,
      me     = null;

  cookie = cookie.match(/hapi-cookie=([^;]*)/)[1];

  Iron.unseal(cookie, 'ren and stimpy', Iron.defaults, function(err, unsealed){
    me = unsealed;

    Game.findOne({room: data.roomId, inProgress: true, isOpen: false}).populate('cards players.player players.cards').exec(function(err, game){
      var player = game.players.filter(function(p){
        return p.player._id.toString() === me._id;
      });

      if(game.cards.length) {
        var index = Math.floor(Math.random() * game.cards.length);

        player = player[0];
        var card = game.cards.splice(index, 1);
        card = card[0];

        player.cards.push(card);
        game.save(function(){
          player.player.password = null;
          socket.to(data.roomId).emit('hit', player);
          socket.emit('hit', player);
        });
      }
    });
  });
};
