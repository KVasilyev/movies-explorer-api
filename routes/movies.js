const router = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  getMoviesList,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMoviesList);
router.post('/', celebrates.validationMovie, addMovie);
router.delete('/:_id', celebrates.validationMovieId, deleteMovie);

module.exports = router;
