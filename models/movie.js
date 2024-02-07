const mongoose = require('mongoose');
const { URL_CHECK } = require('../utils/constants');

const movieScheme = new mongoose.Schema({
  country: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
  director: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
  duration: {
    type: Number,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
  year: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
  description: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
  image: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    validate: {
      validator: (image) => {
        URL_CHECK.test(image);
      },
      message: 'Неправильный формат URL',
    },
  },
  trailerLink: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    validate: {
      validator: (trailer) => {
        URL_CHECK.test(trailer);
      },
      message: 'Неправильный формат URL',
    },
  },
  thumbnail: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    validate: {
      validator: (thumb) => {
        URL_CHECK.test(thumb);
      },
      message: 'Неправильный формат URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
  movieId: {
    type: Number,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
  nameRU: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
  nameEN: {
    type: String,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  },
});

module.exports = mongoose.model('movie', movieScheme);
