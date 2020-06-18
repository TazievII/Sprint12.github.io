const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/notfound');

module.exports.getUsers = (req, res) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err._message }));
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password.trim().length >= 8) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => {
        if (validator.isURL(avatar)) {
          res.status(201).send({
            _id: user._id,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
          return;
        } Promise.reject();
      })
      .catch(next);
  } else if (password.trim().length < 8) {
    return res.status(400).send({ message: 'Пароль не может быть менее 8 символов' });
  }
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
  if (name.length < 2 || name.length > 30 || about.length < 2 || about.length > 30) {
    return res.send({ message: 'Недопустимое значение (от 2 до 30 символов)' });
  }
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (validator.isURL(avatar)) {
        res.send({ data: user });
      } else res.status(400).send({ message: 'Ошибка в ссылке на аватар' });
    })
    .catch(next);
};
