const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', userController.validateNewUser, userController.createUser);

module.exports = userRouter;