const usersRouter = require('express').Router();
const {
  getUsers, createUser, findUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', findUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
