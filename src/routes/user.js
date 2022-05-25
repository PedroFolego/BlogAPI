const express = require('express');
const userController = require('../controllers/userController');
const tokenValidate = require('../middlewares/tokenValidation');

const userRouter = express.Router();

userRouter.post('/', userController.validateNewUser, userController.createUser);

userRouter.get('/', tokenValidate, userController.findUsers);

userRouter.get('/:id', tokenValidate, userController.findById);

userRouter.delete('/me', tokenValidate, userController.deleteMe);

module.exports = userRouter;