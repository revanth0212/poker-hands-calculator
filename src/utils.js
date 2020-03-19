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
  sort
} = require("ramda");

// Helpers

const getFaceValues = function(cards) {
  return cards.map(({ faceValue }) => faceValue);
};

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

const numericAscSortFn = (a, b) => a > b;

// Rules

const isFlush = function(cards) {
  return compose(all(equals(cards[0].shape)), map(prop("shape")))(cards);
};

const isStraight = function(cards) {
  let i = 0;
  const diffArray = [];
  for (i in cards) {
    if (i < cards.length - 1) {
      diffArray.push(cards[+i + 1].faceValue - cards[+i].faceValue);
    }
  }
  return all(equals(1), diffArray);
};

const isStraightFlush = function(cards) {
  return isFlush(cards) && isStraight(cards);
};

const isRoyalFlush = function(cards) {
  return cards[0].faceValue === 10 && isStraightFlush(cards);
};

const is4OfAKind = function(cards) {
  const faceValues = getFaceValues(cards);
  const arrayEqualityChecker = (v, a) => all(equals(v), a);
  return either(
    converge(arrayEqualityChecker, [head, init]),
    converge(arrayEqualityChecker, [last, tail])
  )(faceValues);
};

const is3OfAKind = function(cards) {
  const fv = getFaceValues(cards);
  return fv[0] === fv[2] || fv[1] === fv[3] || fv[2] === fv[4];
};

const is2OfAKind = compose(
  equals([1, 1, 1, 2]),
  sort(numericAscSortFn),
  values,
  getCardValuesSet
);

const isFullHouse = compose(
  equals([2, 3]),
  sort(numericAscSortFn),
  values,
  getCardValuesSet
);

const is2Pair = compose(
  equals([1, 2, 2]),
  sort(numericAscSortFn),
  values,
  getCardValuesSet
);

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
