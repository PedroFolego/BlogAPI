const express = require('express');
const postController = require('../controllers/postController');
const tokenValidate = require('../middlewares/tokenValidation');

const postRouter = express.Router();

postRouter.get('/search', tokenValidate,
  postController.getAllPostsQuery);

postRouter.post('/', tokenValidate,
  postController.validatePost,
  postController.createPost);

postRouter.get('/', tokenValidate,
  postController.getPosts);

postRouter.get('/:id', tokenValidate,
  postController.getPostId);

postRouter.put('/:id', tokenValidate,
  postController.validateBodyUpdate,
  postController.validateIdUser,
  postController.updatePost);

postRouter.delete('/:id', tokenValidate,
  postController.validatePostId,
  postController.validateIdUser,
  postController.deletePost);

module.exports = postRouter;