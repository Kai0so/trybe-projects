const serialize = (salesData) => salesData.map((s) => {
  const serializedData = {
    saleId: s.sale_id,
    date: s.date,
    productId: s.product_id,
    quantity: s.quantity,
  };
  return serializedData;
});

module.exports = {
  serialize,
};