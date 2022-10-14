const { product } = require('../database/models/index');

const ProductService = {
 findAll: async () => {
    const result = await product.findAll();

    return result;
  },
};

module.exports = ProductService;
