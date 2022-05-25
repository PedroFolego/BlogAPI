const { Op } = require('sequelize');
const { Category, User, BlogPost, PostCategory } = require('../database/models');

const findCategoryIdService = async (categoryIds) => 
  Category.findOne({ where: { id: categoryIds } });

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
    }, {
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
    }, {
      as: 'categories',
      model: Category,
      through: { attributes: [] },
    }],
  });
  return posts;
};

const updatePostService = async ({ id, title, content }) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      as: 'user',
      model: User,
      attributes: { exclude: ['password'] },
    }, {
      as: 'categories',
      model: Category,
      through: { attributes: [] },
    }],
  });
  await post.update({ title, content, updated: new Date() });
  return post;
};

const validateUserPost = ({ id, userId }) => BlogPost.findOne({ where: { userId, id } });

const destroyPost = async ({ id }) => BlogPost.destroy({ where: { id } });

const getAllPostsLike = async (params) => {
  const query = `%${params}%`;
  const posts = await BlogPost.findAll({
    include: [{
      as: 'user',
      model: User,
      attributes: { exclude: ['password'] },
    }, {
      as: 'categories',
      model: Category,
      through: { attributes: [] },
    }],
    where: { [Op.or]: [
      { title: { [Op.like]: query } },
      { content: { [Op.like]: query } },
    ] },
  });
  return posts;
};

module.exports = {
  findCategoryIdService,
  createPostService,
  getPostsService,
  getPostIdService,
  updatePostService,
  validateUserPost,
  destroyPost,
  getAllPostsLike,
};