const schemaCategory = require('../schemas/category');
const { addCategory, getCategories } = require('../services/categoryService');
const { CREATED_STATUS, BAD_REQUEST_STATUS, OK_STATUS } = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const id = await addCategory(name);
  return res.status(CREATED_STATUS).json({ id, name });
};

const validateCategory = (req, _res, next) => {
  const { name } = req.body; 
  const { error } = schemaCategory.validate({ name });
  if (error) return next(statusMessage(BAD_REQUEST_STATUS, error.message));
  next();
};

const getAllCategories = async (req, res) => {
  const categories = await getCategories();
  return res.status(OK_STATUS).json(categories);
};

module.exports = {
  createCategory,
  validateCategory,
  getAllCategories,
};