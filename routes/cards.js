const cardsRouter = require('express').Router();

const cards = require('../data/cards.json');

cardsRouter.get('/', (req, res) => {
  res.status(200).send(cards);
});

cardsRouter.all('/:id', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});


module.exports = cardsRouter;
