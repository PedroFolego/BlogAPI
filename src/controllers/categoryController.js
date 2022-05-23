const schemaCategory = require('../schemas/category');
const { addCategory } = require('../services/categoryService');
const { CREATED_STATUS, BAD_REQUEST_STATUS } = require('../utils/constants');
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

module.exports = {
  createCategory,
  validateCategory,
};