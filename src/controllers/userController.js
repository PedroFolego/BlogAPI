require('dotenv').config();
const jwt = require('jsonwebtoken');
const schemaUser = require('../schemas/user');
const {
  findUser,
  createUserService,
  findUserService,
  findByIdService,
} = require('../services/userService');
const {
  BAD_REQUEST_STATUS,
  CREATED_STATUS,
  CONFLICT_STATUS,
  jwtConfig,
  errorMessage,
  OK_STATUS,
  NOT_FOUND_STATUS,
} = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const createUser = async (req, res) => {
  const { displayName, email, image } = req.body;
  await createUserService(req.body);
  const token = jwt.sign({ data: displayName, email, image }, process.env.JWT_SECRET, jwtConfig);
  return res.status(CREATED_STATUS).json({ token });
};

const validateNewUser = async (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = schemaUser.validate({ displayName, email, password });
  if (error) return next(statusMessage(BAD_REQUEST_STATUS, error.message));
  if (await findUser(email)) return next(statusMessage(CONFLICT_STATUS, errorMessage.userExist));
  next();
};

const findUsers = async (_req, res) => {
  const users = await findUserService();
  return res.status(OK_STATUS).json(users);
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  const user = await findByIdService(id);
  if (!user) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.userNotExist));
  return res.status(OK_STATUS).json(user);
};

module.exports = {
  createUser,
  validateNewUser,
  findUsers,
  findById,
};