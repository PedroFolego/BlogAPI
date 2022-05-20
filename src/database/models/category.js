module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories'
  });

  // User.associate = (models) => {
  //   User.hasMany(models.,
  //     { foreignKey: '', as: '' });
  // };

  return Category;
};