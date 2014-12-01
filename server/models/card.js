'use strict';

var mongoose   = require('mongoose'),
  CardSchema = null,
  Card       = null;

CardSchema = new mongoose.Schema({
  suit: String,
  rank: String,
  file: String
});

Card = mongoose.model('Card', CardSchema);
module.exports = Card;
