require('dotenv').config();
const jwt = require('jsonwebtoken');
const schemaPost = require('../schemas/post');
const { findCategoryIdService } = require('../services/postService');
const { BAD_REQUEST_STATUS, errorMessage, CREATED_STATUS } = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = schemaPost.validate({ title, content, categoryIds });
  if (error) return next(statusMessage(BAD_REQUEST_STATUS, errorMessage.missingFields));

  const categoryId = await findCategoryIdService(categoryIds);
  if (!categoryId) return next(statusMessage(BAD_REQUEST_STATUS, errorMessage.categoryIdNotFound));
  next();
};

const getIdFromAuthrization = (token) => {
  const data = jwt.validate(token, process.env.JWT_SECRET);
  
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  const { id, published, updated } = await createPostService({ title, content, categoryIds });
  return res.status(CREATED_STATUS).json({ id, title, content, updated, published });
};

module.exports = {
  validatePost,
  createPost,
};