const express = require('express');
const postController = require('../controllers/postController');
const tokenValidate = require('../middlewares/tokenValidation');

const postRouter = express.Router();

postRouter.post('/', tokenValidate,
  postController.validatePost);

module.exports = postRouter;