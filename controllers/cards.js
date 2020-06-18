const validator = require('validator');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res, next) => {
  const {
    name, link, createdAt,
  } = req.body;
  if (name.length < 2 || name.length > 30) {
    res.status(400).send({ message: 'Недопустимое значение (от 2 до 30 символов)' });
  }
  Card.create({
    name, link, owner: req.user._id, createdAt,
  })
    .then((card) => {
      if (validator.isURL(link)) {
        res.status(200).send({ data: card });
      } else res.status(400).send({ message: 'Некорректная ссылка на картинку' });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      } if (toString(card.owner) === toString(req.user._id)) {
        card.remove(req.params.cardId);
        return res.status(200).send({ message: 'Удалено' });
      } res.status(403).send({ message: 'Нет прав на удаление карточки' });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
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
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};
