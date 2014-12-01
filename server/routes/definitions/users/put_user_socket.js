'use strict';

var Joi  = require('joi'),
    User = require('../../../models/user');

module.exports = {
  description: 'Update a User',
  tags:['users'],
  validate: {
    params: {
      userId: Joi.string().regex(/^[a-f0-9]{24}$/).required()
    },
    payload: {
      socketId: Joi.string().length(20).required()
    }
  },
  handler: function(request, reply){
    User.findOneAndUpdate({_id:request.params.userId}, request.payload, function(err, user){
      reply().code(user ? 200 : 400);
    });
  }
};
