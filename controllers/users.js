const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/notfound');
const BatRequest = require('../errors/badrequest');
const EmailExist = require('../errors/emailExist');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BatRequest('Неверный запрос');
      }
      // eslint-disable-next-line eqeqeq
      if (err.errors.email.kind === 'unique') {
        throw new EmailExist('Данный email уже используется');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByEmail(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      } res.send({ data: user });
    })
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
