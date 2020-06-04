const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports.getUsers = (req, res) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err._message }));
};

module.exports.createUser = (req, res) => {
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
        } else res.status(400).send({ message: 'Ошибка в ссылке на аватар' });
      })
      .catch((err) => {
        if (err.errors.email.properties.type === 'unique') {
          res.status(409).send({ message: 'Пользователь с таким email уже существует' });
        } if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Ошибка в данных' });
        } else {
          res.status(500).send({ message: err._message });
        }
      });
  } else res.status(400).send({ message: 'Пароль слишком короткий' });
};

module.exports.login = (req, res) => {
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
    .catch((err) => {
      res.status(401).send({ message: err._message });
    });
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: err._message }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err._message });
      } else {
        res.status(500).send({ message: err._message });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (validator.isURL(avatar)) {
        res.send({ data: user });
      } else res.status(400).send({ message: 'Ошибка в ссылке на аватар' });
    })
    .catch((err) => res.status(500).send({ message: err._message }));
};
