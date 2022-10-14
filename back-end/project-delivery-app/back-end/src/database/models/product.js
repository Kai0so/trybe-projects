'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
  }

  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(100)
    },
    price: {
      type: DataTypes.DECIMAL(4,2)
    },
    urlImage: {
      type: DataTypes.STRING(200),
      field: 'url_image',
    },
  }, {
    sequelize,
    modelName: 'product',
    timestamps: false,
  });
  return Product;
};