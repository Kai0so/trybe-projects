const getSavedCartItems = (addToCart) => {
  const storageCart = localStorage.getItem('cartItems');
  if (storageCart) {
    JSON.parse(storageCart).cartItems.forEach((item) => {
    addToCart(item.sku);
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
