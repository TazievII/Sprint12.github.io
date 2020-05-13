const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.all('/:id', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

module.exports = router;
