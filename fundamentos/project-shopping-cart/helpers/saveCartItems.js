const saveCartItems = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
