require('dotenv').config();
const jwt = require('jsonwebtoken');
// const Sequelize = require('sequelize');
// const config = require('../database/config/config');
const { Category, User, BlogPost, PostCategory } = require('../database/models');

const findCategoryIdService = async (categoryIds) => 
  Category.findOne({ where: { id: categoryIds } });

const getIdFromToken = async (token) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const findUser = await User.findOne({ where: { email: data } });
  return findUser.id;
};
  
const createPostService = async ({ title, content, userId, categoryIds }) => {
  const post = await BlogPost.create({ title, content, userId });
  await categoryIds.forEach(
    async (id) => PostCategory.create({ postId: post.dataValues.id, categoryId: id }),
  );
  return post;
};

const getPostsService = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      as: 'user',
      model: User,
      attributes: { exclude: ['password'] },
    },
    {
      as: 'categories',
      model: Category,
      through: { attributes: [] },
    }],
  });
  return posts;
};

const getPostIdService = async (id) => {
  const posts = await BlogPost.findByPk(id, {
    include: [{
      as: 'user',
      model: User,
      attributes: { exclude: ['password'] },
    },
    {
      as: 'categories',
      model: Category,
      through: { attributes: [] },
    }],
  });
  return posts;
};

module.exports = {
  findCategoryIdService,
  getIdFromToken,
  createPostService,
  getPostsService,
  getPostIdService,
};