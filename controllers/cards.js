const validator = require('validator');
const Card = require('../models/card');
const BadRequest = require('../errors/badrequest');
const NotFound = require('../errors/notfound');
const NonAuth = require('../errors/NonAuth');

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
  if (validator.isURL(link)) {
    Card.create({
      name, link, owner: req.user._id, createdAt,
    })
      .then((card) => {
        res.status(200).send({ data: card });
      })
      .catch(next);
  } else throw new BadRequest('Ошибка в URL');
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточки нет по указанному id');
      } if (toString(card.owner) === toString(req.user._id)) {
        card.remove(req.params.cardId);
        return res.status(200).send({ message: 'Удалено' });
      } throw new NonAuth('Недостаточно прав');
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
