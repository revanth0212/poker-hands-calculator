const {
  compose,
  map,
  equals,
  all,
  prop,
  head,
  last,
  tail,
  init,
  converge,
  either,
  values,
  sort,
  allPass,
  subtract,
  flip,
  identity,
  anyPass
} = require("ramda");

// Helpers

const getFaceValues = map(prop("faceValue"));

const getCardValuesSet = function(cards) {
  const obj = {};
  cards.forEach(card => {
    const fv = card.faceValue;
    if (fv in obj) {
      obj[fv]++;
    } else {
      obj[fv] = 1;
    }
  });
  return obj;
};

const numericAscSortFn = subtract;

// Rules

const isRoyalFlush = function(cards) {
  /**
   * Is a Straight Flush with cards starting with 10 to A
   */
};

const isStraightFlush = function(cards) {
  /**
   * Is a Straight and a Flush
   */
};

const is4OfAKind = function(cards) {
  /**
   * 4 cards should be of a certain rank
   */
};

const isFullHouse = function(cards) {
  /**
   * Should have a 3 of a kind and other 2 of another kind
   */
};

const isFlush = function(cards) {
  /**
   * All cards have same shape
   */
};

const isStraight = function(cards) {
  /**
   * All cards are in sequential rank order
   */
};

const is3OfAKind = function(cards) {
  /**
   * 3 cards should be of a certain rank
   */
};

const is2Pair = function(cards) {
  /**
   * Should have 2 sets that are 2 of a kind
   */
};

const is2OfAKind = function(cards) {
  /**
   * 2 cards should be of a certain rank
   */
};

// Calculator

const hands = {
  royalFlush: isRoyalFlush,
  straightFlush: isStraightFlush,
  "4OfAKind": is4OfAKind,
  fullHouse: isFullHouse,
  flush: isFlush,
  straight: isStraight,
  "3OfAKind": is3OfAKind,
  "2Pairs": is2Pair,
  "2OfAKind": is2OfAKind
};

const getHighestCard = compose(prop("faceValue"), last);

function getBestHand(cards) {
  let bestHand = null;
  let hand = null;
  for (hand in hands) {
    const result = hands[hand](cards);
    if (result) {
      bestHand = hand;
      break;
    }
  }
  return bestHand;
}

module.exports = {
  getHighestCard,
  getBestHand
};
