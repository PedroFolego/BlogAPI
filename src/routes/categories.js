const express = require('express');
const categoryController = require('../controllers/categoryController');
const tokenValidate = require('../middlewares/tokenValidation');

const categoryRouter = express.Router();

categoryRouter.post('/', tokenValidate,
  categoryController.validateCategory,
  categoryController.createCategory);

module.exports = categoryRouter;