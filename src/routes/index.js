const express = require('express');
const { validateLogin } = require('../controllers/loginController');
const categoryRouter = require('./categories');
const userRouter = require('./user');

const router = express.Router();

router.use('/login', validateLogin);
router.use('/user', userRouter);
router.use('/categories', categoryRouter);

module.exports = router;