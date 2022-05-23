require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findUser } = require('../services/loginService');
const { BAD_REQUEST_STATUS, errorMessage, jwtConfig, OK_STATUS } = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(statusMessage(BAD_REQUEST_STATUS, errorMessage.missingFields));
  }
  if (!await findUser(email, password)) {
    return next(statusMessage(BAD_REQUEST_STATUS, errorMessage.invalidFields));
  }
  const token = jwt.sign({ data: email }, process.env.JWT_SECRET, jwtConfig);
  res.status(OK_STATUS).json({ token });
};

module.exports = {
  validateLogin,
};