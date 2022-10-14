const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'Categories',
      underscored: false,
    });

  Category.associate = (models) => {
    Category.hasOne(models.PostCategory,
      { foreignKey: 'categoryId', as: 'postCategories' });
  };

  return Category;
};

module.exports = Category;