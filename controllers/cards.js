const validator = require('validator');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => res.status(500).send({ message: err._message }));
};

module.exports.createCard = (req, res) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err._message });
      } return res.status(500).send({ message: err._message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      const newLocal = toString(card.owner) === toString(req.user._id);
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else if (newLocal) {
        card.remove(req.params.cardId);
        res.status(200).send({ message: 'Удалено' });
      } else {
        res.status(403).send({ message: 'Нет прав на удаление карточки' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => res.status(500).send({ message: err._message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => res.status(500).send({ message: err._message }));
};
