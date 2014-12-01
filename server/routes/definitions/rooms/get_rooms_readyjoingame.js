'use strict';

var Joi  = require('joi'),
  Game = require('../../../models/game');

module.exports = {
  description: 'Is Room Ready to Join Game',
  tags:['rooms'],
  validate: {
    params: {
      roomId: Joi.string().regex(/^[a-f0-9]{24}$/).required()
    }
  },
  handler: function(request, reply){
    Game.findOne({room: request.params.roomId, inProgress: true, isOpen: true}, function(err, game){
      reply().code(game ? 200 : 400);
    });
  }
};
