const router = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  getUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', celebrates.validationUpdateUser, updateUser);

module.exports = router;
