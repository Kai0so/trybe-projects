'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleProduct extends Model {
  }

  SaleProduct.init({
    saleId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'sale_id',
      references: {
        model: 'sales',
        key: 'id'
      }
    },
    productId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'salesProducts',
    underscored: true,
    timestamps: false,
  });
  return SaleProduct;
};