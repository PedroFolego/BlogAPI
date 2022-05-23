const express = require('express');
const { validateLogin } = require('../controllers/loginController');
const categoryRouter = require('./categories');
const postRouter = require('./post');
const userRouter = require('./user');

const router = express.Router();

router.use('/login', validateLogin);
router.use('/user', userRouter);
router.use('/categories', categoryRouter);
router.use('/post', postRouter);

module.exports = router;