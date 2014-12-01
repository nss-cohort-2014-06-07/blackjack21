'use strict';

var mongoose   = require('mongoose'),
    GameSchema = null,
    Game       = null;

GameSchema = new mongoose.Schema({
  players:    [{
    player: {type: mongoose.Schema.ObjectId, ref: 'User'},
    cards:  [{type: mongoose.Schema.ObjectId, ref: 'Card'}]
  }],
  room:       {type: mongoose.Schema.ObjectId, ref: 'Room', required: true},
  winner:     {type: mongoose.Schema.ObjectId, ref: 'User', required: false},
  cards:      [{type: mongoose.Schema.ObjectId, ref: 'Card'}],
  inProgress: {type: Boolean, required: true, default:true},
  isOpen:     {type: Boolean, required: true, default:true},
  createdAt:  {type: Date,    required: true, default: Date.now}
});

Game = mongoose.model('Game', GameSchema);
module.exports = Game;
