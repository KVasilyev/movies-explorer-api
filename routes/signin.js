const router = require('express').Router();
const { signinUser } = require('../controllers/users');
const celebrates = require('../middlewares/celebrates');

router.post('/', celebrates.validationSigninUser, signinUser);

module.exports = router;
