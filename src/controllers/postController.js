const { schemaPostCreate, schemaPostUpdate } = require('../schemas/post');
const {
  findCategoryIdService, 
  getIdFromToken, 
  createPostService, 
  getPostsService,
  getPostIdService,
  updatePostService,
  validateUserPost,
  destroyPost,
} = require('../services/postService');
const {
  errorMessage,
  BAD_REQUEST_STATUS,
  CREATED_STATUS, 
  OK_STATUS, 
  NOT_FOUND_STATUS,
  UNAUTHORIZED_STATUS,
  NO_CONTENT_STATUS,
} = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const validatePost = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = schemaPostCreate.validate({ title, content, categoryIds });
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

const getPosts = async (_req, res) => {
  const posts = await getPostsService();
  return res.status(OK_STATUS).json(posts);
};

const getPostId = async (req, res, next) => {
  const { id } = req.params;
  const postsId = await getPostIdService(id);
  if (!postsId) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.postNotExist));

  return res.status(OK_STATUS).json(postsId);
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const post = await updatePostService({ id, title, content });

  return res.status(OK_STATUS).json(post);
};

const validateIdUser = async (req, _res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const userId = await getIdFromToken(token);
  const validate = await validateUserPost({ id, userId });
  if (!validate) return next(statusMessage(UNAUTHORIZED_STATUS, errorMessage.unathorizeduser));
  next();
};

const validateBodyUpdate = async (req, _res, next) => {
  const { title, content } = req.body;
  const { error } = schemaPostUpdate.validate({ title, content });
  if (error) return next(statusMessage(BAD_REQUEST_STATUS, errorMessage.missingFields));
  next();
};

const validatePostId = async (req, _res, next) => {
  const { id } = req.params;
  const postsId = await getPostIdService(id);
  if (!postsId) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.postNotExist));
  next();
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await destroyPost({ id });
  return res.status(NO_CONTENT_STATUS).end();
};

module.exports = {
  validatePost,
  createPost,
  getPosts,
  getPostId,
  updatePost,
  validateBodyUpdate,
  validateIdUser,
  deletePost,
  validatePostId,
};