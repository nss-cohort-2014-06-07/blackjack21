'use strict';

var Joi  = require('joi'),
  Game = require('../../../models/game'),
  Room = require('../../../models/room');

module.exports = {
  description: 'Is Room Ready for New Game',
  tags:['rooms'],
  validate: {
    params: {
      roomId: Joi.string().regex(/^[a-f0-9]{24}$/).required()
    }
  },
  handler: function(request, reply){
    Room.findOne({_id:request.params.roomId}, function(err, room){
      if(room.creator.toString() === request.auth.credentials._id) {
        Game.findOne({room:request.params.roomId, inProgress:true}, function(err, game){
          reply().code(game ? 400 : 200);
        });
      }else{
        reply().code(400);
      }
    });
  }
};
