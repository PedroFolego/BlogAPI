require('dotenv').config();
const jwt = require('jsonwebtoken');
const schemaUser = require('../schemas/user');
const { findUser, createUserService } = require('../services/userService');
const {
  BAD_REQUEST_STATUS,
  CREATED_STATUS,
  CONFLICT_STATUS,
  jwtConfig,
  errorMessage,
} = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const createUser = async (req, res) => {
  const { displayName, email, image } = req.body;
  await createUserService(req.body);
  const token = jwt.sign({ data: displayName, email, image }, process.env.JWT_SECRET, jwtConfig);
  return res.status(CREATED_STATUS).json({ token });
};

const validateNewUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = schemaUser.validate({ displayName, email, password });
  if (error) return next(statusMessage(BAD_REQUEST_STATUS, error.message));
  if (await findUser(email)) return next(statusMessage(CONFLICT_STATUS, errorMessage.userExist));
  next();
};

module.exports = {
  createUser,
  validateNewUser,
};