const { Router } = require('express');
const SalesController = require('../controller/SalesController');

const salesRoute = Router();

salesRoute.post('/', SalesController.add);

salesRoute.get('/', SalesController.getOrders);
salesRoute.get('/:id', SalesController.getById);
salesRoute.patch('/', SalesController.updateStatus);
salesRoute.get('/sp/:id', SalesController.salesProdsById);

module.exports = salesRoute;
