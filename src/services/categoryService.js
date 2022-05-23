const { Category } = require('../database/models');

const addCategory = async (name) => Category.create({ name });

const getCategories = async () => Category.findAll();

module.exports = {
  addCategory,
  getCategories,
};