const { User } = require('../database/models');

const createUserService = async (body) => User.create({ ...body });

const findUser = async (email) => User.findOne({ where: { email } });

const findUserService = async () => User.findAll({
  attributes: { exclude: ['password'] },
});

module.exports = {
  findUser,
  createUserService,
  findUserService,
};