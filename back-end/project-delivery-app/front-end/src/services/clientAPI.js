const fetchProducts = async () => {
  const url = 'http://localhost:3001/products';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchProductById = async (id) => {
  const url = `http://localhost:3001/products/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchSalesProductsById = async (id) => {
  const url = `http://localhost:3001/sales/sp/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchSaleById = async (id) => {
  const url = `http://localhost:3001/sales/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default fetchProducts;
