'use strict';

var Room = require('../../../models/room');

module.exports = {
  description: 'Get all Rooms',
  tags:['rooms'],
  handler: function(request, reply){
    Room.find().populate('creator').exec(function(err, rooms){
      rooms = rooms.map(function(room){
        return {name: room.name, avatar: room.creator.avatar, createdAt: room.createdAt};
      });
      reply({rooms:rooms});
    });
  }
};
