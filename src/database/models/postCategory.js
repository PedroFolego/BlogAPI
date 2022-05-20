module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, allowNull: false},
    categoryId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    timestamps: false,
    tableName: 'PostCategories'
  });


  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      otherKey: 'id',
      foreignKey: 'id',
      as: 'postBlog',
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      otherKey: 'id',
      foreignKey: 'id',
      as: 'category',
    });
  };

  return PostCategory;
};