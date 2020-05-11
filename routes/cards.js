const cardsJson = require('../data/cards.json');

function cards(res) {
  res.status(200).send(cardsJson);
}

module.exports = cards;
