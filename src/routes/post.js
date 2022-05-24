const express = require('express');
const postController = require('../controllers/postController');
const tokenValidate = require('../middlewares/tokenValidation');

const postRouter = express.Router();

postRouter.post('/', tokenValidate,
  postController.validatePost,
  postController.createPost);

postRouter.get('/', tokenValidate,
  postController.getPosts);

postRouter.get('/:id', tokenValidate,
  postController.getPostId);

module.exports = postRouter;