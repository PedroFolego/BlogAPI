const { User } = require('../database/models');

const createUserService = async (body) => User.create({ ...body });

const findUser = async (email) => User.findOne({ where: { email } });

module.exports = {
  findUser,
  createUserService,
};