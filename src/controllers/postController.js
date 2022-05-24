const schemaPost = require('../schemas/post');
const {
  findCategoryIdService, 
  getIdFromToken, 
  createPostService, 
  getPostsService,
  getPostIdService,
} = require('../services/postService');
const {
  errorMessage,
  BAD_REQUEST_STATUS,
  CREATED_STATUS, 
  OK_STATUS, 
  NOT_FOUND_STATUS} = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const validatePost = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = schemaPost.validate({ title, content, categoryIds });
  if (error) return next(statusMessage(BAD_REQUEST_STATUS, errorMessage.missingFields));

  const categoryId = await findCategoryIdService(categoryIds);
  if (!categoryId) return next(statusMessage(BAD_REQUEST_STATUS, errorMessage.categoryIdNotFound));
  next();
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;
  const userId = await getIdFromToken(token);
  const post = await createPostService({ title, content, userId, categoryIds });

  return res.status(CREATED_STATUS).json(post);
};

const getPosts = async (req, res) => {
  const posts = await getPostsService();
  return res.status(OK_STATUS).json(posts);
};

const getPostId = async (req, res, next) => {
  const { id } = req.params;
  const postsId = await getPostIdService(id);
  if (!postsId) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.postNotExist));

  return res.status(OK_STATUS).json(postsId);
};

module.exports = {
  validatePost,
  createPost,
  getPosts,
  getPostId,
};