'use strict';

var Joi  = require('joi'),
  Game = require('../../../models/game');

module.exports = {
  description: 'Join Game',
  tags:['games'],
  validate: {
    payload: {
      roomId: Joi.string().regex(/^[a-f0-9]{24}$/).required()
    }
  },
  handler: function(request, reply){
    Game.findOne({room: request.payload.roomId, inProgress: true, 'players.player': {'$ne':request.auth.credentials._id}}, function(err, game){
      if(game){
        game.players.push({player:request.auth.credentials._id});
        game.save();
      }

      reply();
    });
  }
};
