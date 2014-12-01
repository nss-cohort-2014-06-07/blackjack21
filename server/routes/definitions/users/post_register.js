'use strict';

var Joi  = require('joi'),
    User = require('../../../models/user');

module.exports = {
  description: 'Register a User',
  tags:['users'],
  validate: {
    payload: {
      username: Joi.string().min(3).max(12).required(),
      password: Joi.string().min(3).required(),
      avatar: Joi.string().required()
    }
  },
  auth: {
    mode: 'try'
  },
  handler: function(request, reply){
    var user = new User(request.payload);
    user.encrypt();
    user.download(function(){
      user.save(function(err){
        reply().code(err ? 401 : 200);
      });
    });
  }
};
