const router = require('express').Router();
const { users, searchUser } = require('./users');
const cards = require('./cards');

router.get('/users', (req, res) => {
  users(res);
});

router.get('/cards', (req, res) => {
  cards(res);
});

router.get('/users/:id', (req, res) => {
  searchUser(req, res);
  if (searchUser(req, res) === undefined) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});

router.all('/:id', (req, res) => {
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
