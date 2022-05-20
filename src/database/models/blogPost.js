module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, allowNull: false },
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'BlogPosts'
  });


  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' });
  };

  return BlogPost;
};