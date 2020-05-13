const usersRouter = require('express').Router();

const users = require('../data/users.json');

usersRouter.get('/', (req, res) => {
  res.send(users);
});

usersRouter.get('/:id', (req, res) => {
  const user = users.find((item) => item._id === req.params.id);
  if (user) {
    res.status(200).send(user);
    return;
  }
  res.status(404).send({ message: 'Такого пользователя нет' });
});

usersRouter.all('/:id/:id', (req, res) => {
  return res.status(404).send({ message: 'Запрашиваемый ресурс не найден' })
});


module.exports = usersRouter;
