const { Category } = require('../database/models');

const findCategoryIdService = async (categoryIds) => 
  Category.findOne({ where: { id: categoryIds } });

module.exports = {
  findCategoryIdService,
};