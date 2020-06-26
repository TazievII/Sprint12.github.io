const Card = require('../models/card');
const NotFound = require('../errors/notfound');
const Forbidden = require('../errors/forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    name, link, createdAt,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id, createdAt,
  })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточки нет по указанному id');
      } if (card.owner._id.toString() === req.user._id) {
        return card.remove(req.params.cardId).then(() => res.status(200).send({ message: 'Удалено' }));
      } throw new Forbidden('Недостаточно прав');
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточки нет по указанному id');
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточки нет по указанному id');
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};
