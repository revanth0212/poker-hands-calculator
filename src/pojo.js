const { getBestHand, getHighestCard } = require("./utils.js");

function Card(faceValue, shape) {
  this.faceValue = faceValue;
  this.shape = shape;
}

function Player(name, cards) {
  this.name = name;
  this.cards = cards.sort(this.sortCards);
  this.bestHand = this.calculateBestHand();
  this.highestCard = this.getHighestCard();
}

Player.prototype.sortCards = function(a, b) {
  return a.faceValue > b.faceValue;
};

Player.prototype.calculateBestHand = function() {
  return getBestHand(this.cards);
};

Player.prototype.getHighestCard = function() {
  return getHighestCard(this.cards);
};

module.exports = {
  Card,
  Player
};
