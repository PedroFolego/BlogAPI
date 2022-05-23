require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { UNAUTHORIZED_STATUS, errorMessage } = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const tokenValidate = async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(statusMessage(UNAUTHORIZED_STATUS, errorMessage.tokenNotFound));
  try {
    const { data } = jwt.verify(authorization, process.env.JWT_SECRET);
    const findUser = await User.findOne({ where: { email: data } });
    if (!findUser) throw Error; 
    next();
  } catch (er) {
    next(statusMessage(UNAUTHORIZED_STATUS, errorMessage.tokenExpired));
  }
};

module.exports = tokenValidate;