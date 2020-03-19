const { Card, Player } = require("./pojo.js");
const { CARD_SHAPES, CARD_VALUES } = require("./constants.js");

const p = new Player("James", [
  new Card(CARD_VALUES.K, CARD_SHAPES.HEART),
  new Card(CARD_VALUES["10"], CARD_SHAPES.HEART),
  new Card(CARD_VALUES["9"], CARD_SHAPES.DIAMOND),
  new Card(CARD_VALUES.K, CARD_SHAPES.HEART),
  new Card(CARD_VALUES.K, CARD_SHAPES.HEART)
]);

console.log(`\n\nPlayer's best hand ${p.bestHand}\n\n`);
