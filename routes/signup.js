const router = require('express').Router();
const { createUser } = require('../controllers/users');
const celebrates = require('../middlewares/celebrates');

router.post('/', celebrates.validationCreateUser, createUser);

module.exports = router;
