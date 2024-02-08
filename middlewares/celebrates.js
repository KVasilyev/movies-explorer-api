const { celebrate, Joi } = require('celebrate');
const { URL_CHECK } = require('../utils/constants');

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}, { abortEarly: false });

module.exports.validationSigninUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, { abortEarly: false });

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}, { abortEarly: false });

module.exports.validationMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(URL_CHECK).required(),
    trailerLink: Joi.string().regex(URL_CHECK).required(),
    thumbnail: Joi.string().regex(URL_CHECK).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}, { abortEarly: false });

module.exports.validationMovieId = celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}, { abortEarly: false });
