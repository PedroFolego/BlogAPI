const express = require('express');
const { validateLogin } = require('../controllers/loginController');
const userRouter = require('./user');

const router = express.Router();

router.use('/login', validateLogin);
router.use('/user', userRouter);

module.exports = router;