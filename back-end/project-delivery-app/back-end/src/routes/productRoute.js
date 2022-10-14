const { Router } = require('express');
const ProductController = require('../controller/ProductController');

const productRoute = Router();

productRoute.get(('/'), ProductController.findAll);
productRoute.get('/:id', ProductController.getById);

module.exports = { productRoute };
