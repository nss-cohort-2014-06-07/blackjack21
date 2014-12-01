'use strict';

var Joi  = require('joi'),
    Room = require('../../../models/room');

module.exports = {
  description: 'Join a Room',
  tags:['rooms'],
  validate: {
    payload: {
      password: Joi.string().min(3).required()
    },
    params: {
      name: Joi.string().min(3).required()
    }
  },
  handler: function(request, reply){
    Room.findOne({name:request.params.name, password:request.payload.password}, function(err, room){
      reply({roomId:room ? room._id : null}).code(room ? 200 : 400);
    });
  }
};
