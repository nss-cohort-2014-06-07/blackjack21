'use strict';

var Joi  = require('joi'),
  Game = require('../../../models/game');

module.exports = {
  description: 'New Game',
  tags:['games'],
  validate: {
    payload: {
      roomId: Joi.string().regex(/^[a-f0-9]{24}$/).required()
    }
  },
  handler: function(request, reply){
    Game.create({room:request.payload.roomId}, function(err, game){
      reply().code(err ? 400 : 200);
    });
  }
};
