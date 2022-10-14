const connection = require('./connection');
const { serialize } = require('../middlewares/helpers/serializeData');

const getAll = async () => {
  const query = `SELECT DISTINCT sale_id, date, product_id, quantity
  FROM StoreManager.sales
  JOIN StoreManager.sales_products
  ORDER BY sale_id, product_id ASC`;
  const [sales] = await connection.execute(query);
  return serialize(sales);
};

const getById = async (id) => {
  const query = `SELECT sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products as sp
  JOIN StoreManager.sales as sa
  ON sa.id = sp.sale_id
  WHERE sp.sale_id = ?
  ORDER BY sale_id, product_id ASC;`;
  const [sales] = await connection.execute(query, [id]);
  if (sales.length === 0) return null;
  return serialize(sales);
};

const create = async (sales) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES
  (?, ?, ?);`;
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales (date)
      VALUES (NOW())`,
  );
  sales.forEach(async (s) => {
    const { productId, quantity } = s;
    await connection.execute(query, [insertId, productId, quantity]);
  });
  return { id: insertId, itemsSold: sales };
};

const update = async (id, sales) => {
  const query = `UPDATE StoreManager.sales_products
  SET product_id = ?, quantity = ?
  WHERE sale_id = ?;`;
  sales.forEach(async (s) => {
    const { productId, quantity } = s;
    await connection.execute(query, [productId, quantity, id]);
  });
  return {
    saleId: id,
    itemUpdated: sales,
  };
};

const deleteSale = async (id) => {
  const query = `DELETE
  FROM StoreManager.sales_products
  WHERE sale_id = ?;`;
  await connection.execute(query, [id]);
  return {};
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSale,
};