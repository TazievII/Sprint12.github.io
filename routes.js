const router = require('express').Router();
const users = require('./data/users.json');

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/cards', (req, res) => {
  const cards = require('./data/cards.json');
  res.send(cards);
});

router.get('/users/:id', (req, res) => {
  const id = req.params.id;
  users.forEach(element => {
    if (element._id == id) {
      return res.status(200).send(element);
    }
  });
  users.forEach(element => {
    if (element._id !== id) {
      return res.status(404).send({ "message": "Нет пользователя с таким id" });
    }
  });
});

router.get('/:', (req, res) => {
  res.send({ "message": "Запрашиваемый ресурс не найден" });
});

module.exports = router;
