const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT *
      FROM StoreManager.products
      ORDER BY id ASC;`;
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = `SELECT *
      FROM StoreManager.products
      WHERE id = ?;`;
  const [products] = await connection.execute(query, [id]);
  return products;
};

const create = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
  VALUES
  (?, ?);`;
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  return { id: insertId, name, quantity };
};

const update = async (id, name, quantity) => {
  const query = `UPDATE StoreManager.products
  SET name = ?, quantity = ?
  WHERE id = ?;`;
  await connection.execute(query, [name, quantity, id]);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const query = `DELETE
  FROM StoreManager.products
  WHERE id = ?;`;
  await connection.execute(query, [id]);
  return {};
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};