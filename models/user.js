const mongoose = require('mongoose');
const validator = require('validator');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неправильный формат e-mail',
    },
    unique: true, // Уникальный e-mail
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    select: false, // Не отправлять пароль в запросе
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userScheme);
