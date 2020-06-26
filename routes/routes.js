const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../errors/notfound');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.all('*', () => {
  throw new NotFound('Данного маршрута не существует');
});

module.exports = router;
