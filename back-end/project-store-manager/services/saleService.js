const Sale = require('../models/saleModel');

const getAll = async () => {
  const sales = await Sale.getAll();
  return sales;
};

const getById = async (id) => {
  const sales = await Sale.getById(id);
  if (sales === null) return null;
  return sales;
};

const create = async (sales) => {
  const newSale = await Sale.create(sales);
  return newSale;
};

const update = async (id, sales) => {
  const updatedSale = await Sale.update(id, sales);
  return updatedSale;
};

const deleteSale = async (id) => {
  const deletedSale = await Sale.deleteSale(id);
  return deletedSale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSale,
};
