const ProductService = require('../service/ProductService');
const { product } = require('../database/models/index');

const ProductController = {
  findAll: async (_req, res) => {
    const result = await ProductService.findAll();
    res.status(200).json(result);
  },

  getById: async (req, res) => {
    const result = await product.findByPk(req.params.id);
    res.status(200).json(result);
  },
};

module.exports = ProductController;