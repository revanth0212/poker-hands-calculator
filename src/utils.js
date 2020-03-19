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

const isFlush = function(cards) {
  return compose(all(equals(cards[0].shape)), map(prop("shape")))(cards);
};

const isStraight = function(cards) {
  const faceValues = getFaceValues(cards);
  const diffArrayCalculator = converge(map, [
    compose(flip(subtract), head),
    identity
  ]);

  return compose(
    equals([0, 1, 2, 3, 4]),
    diffArrayCalculator,
    sort(subtract)
  )(faceValues);
};

const isStraightFlush = allPass([isFlush, isStraight]);

const isRoyalFlush = function(cards) {
  const firstCardShouldBe10 = compose(equals(10), prop("faceValue"), head);

  return allPass([firstCardShouldBe10, isStraightFlush])(cards);
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
  const faceValues = getFaceValues(cards);

  return anyPass([
    converge(equals, [prop(0), prop(2)]),
    converge(equals, [prop(1), prop(3)]),
    converge(equals, [prop(2), prop(4)])
  ])(faceValues);
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
