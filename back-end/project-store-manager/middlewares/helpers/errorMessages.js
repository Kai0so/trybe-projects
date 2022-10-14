// Object Literals
function errorMessage(type) {
  const Message = {
    notFoundProduct: { message: 'Product not found' },
    notFoundSale: { message: 'Sale not found' },
    createProductConflict: { message: 'Product already exists' },
    notAllowed: { message: 'Such amount is not permitted to sell' },
  };
  return Message[type];
}

module.exports = {
  errorMessage,
};