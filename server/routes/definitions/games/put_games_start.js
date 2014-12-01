'use strict';

var Joi  = require('joi'),
  Game = require('../../../models/game');

module.exports = {
  description: 'Start Game',
  tags:['games'],
  validate: {
    payload: {
      roomId: Joi.string().regex(/^[a-f0-9]{24}$/).required()
    }
  },
  handler: function(request, reply){
    Game.findOne({room: request.payload.roomId, inProgress: true, isOpen: true}, function(err, game){
      if(game){
        game.isOpen = false;
        game.save();
      }

      reply();
    });
  }
};
