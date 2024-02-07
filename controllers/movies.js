const Movies = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// Возврат всех сохраненных пользователем фильмов
module.exports.getMoviesList = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send({
        movies,
      });
    })
    .catch((err) => next(err));
};

// Добавление пользователем фильма
module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner = req.user._id,
  } = req.body;
  Movies.create({
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.send({
        movie,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Удаляем добавленный пользователем фильм
module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм не найден'));
        return;
      } if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Невозможно удалить фильм, добавленный другим пользователем'));
        return;
      }
      movie.deleteOne()
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
    });
};
