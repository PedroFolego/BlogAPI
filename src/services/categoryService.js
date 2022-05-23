const { Category } = require('../database/models');

const addCategory = async (name) => Category.create({ name });

module.exports = {
  addCategory,
};