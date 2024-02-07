const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// Пользователь
module.exports.getUser = (req, res, next) => {
  const owner = req.user._id;
  User.findById(owner)
    .then((user) => {
      res.status(200).send({
        user,
      });
    })
    .catch(next);
};

// Обновление информации о пользователе
module.exports.updateUser = (req, res, next) => {
  const owner = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(owner, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

// Авторизация пользователя
module.exports.signinUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      } else {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (matched) {
              const token = jwt.sign(
                { _id: user._id },
                NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', // Ключ
                { expiresIn: '7d' },
              );
              res.send({
                token,
              });
            } else {
              throw new UnauthorizedError('Неправильные почта или пароль');
            }
          });
      }
    })
    .catch((err) => next(err));
};

// Регистрация пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(200).send({
          name: user.name,
          _id: user._id,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Этот e-mail уже зарегистрирован'));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError('Некорректные данные'));
          return;
        }
        next(err);
      }));
};
