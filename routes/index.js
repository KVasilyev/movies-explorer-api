const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const notFound = require('./notfound');
const auth = require('../middlewares/auth');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', notFound);

module.exports = router;
