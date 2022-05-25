require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const getIdFromToken = async (token) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const findUser = await User.findOne({ where: { email: data } });
  return findUser.id;
};

const createUserService = async (body) => User.create({ ...body });

const findUser = async (email) => User.findOne({ where: { email } });

const findUserService = async () => User.findAll({
  attributes: { exclude: ['password'] },
});

const findByIdService = async (id) => User.findOne({ 
  where: { id },
  attributes: { exclude: ['password'] },
});

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = {
  findUser,
  createUserService,
  findUserService,
  findByIdService,
  getIdFromToken,
  deleteUser,
};