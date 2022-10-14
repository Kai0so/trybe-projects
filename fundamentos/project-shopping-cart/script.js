const cart = {
  cartItems: [],
  totalPrice: 0,
};

const cartItems = document.querySelector('.cart__items');
const totalItems = document.querySelector('.total-price');
const removeItems = document.querySelector('.empty-cart');
const loadingContainer = document.querySelector('.container');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createCartItemElement({ sku, name, salePrice, id }) {
  const cartItemId = id;
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.id = cartItemId;
  li.addEventListener('click', function (e) {
    const clickedItem = e.target;
    cart.cartItems = cart.cartItems.filter((obj) => obj.id !== cartItemId);
    cart.totalPrice = parseFloat((cart.totalPrice - salePrice).toFixed(2));
    clickedItem.remove();
    totalItems.innerHTML = cart.totalPrice;
    saveCartItems(cart);
    });
  return li;
}

function calculateItemsValue(product) {
  cart.cartItems.push(product);
  cart.totalPrice = parseFloat((product.salePrice + cart.totalPrice).toFixed(2));
  totalItems.innerHTML = cart.totalPrice;
}

async function addToCart(product) {
  const searchCartItem = await fetchItem(product);
  const catchSection = document.querySelector('.cart__items');
      const { id: sku, title: name, price: salePrice } = searchCartItem;
      const objectParam = { sku, name, salePrice, id: cart.cartItems.length + 1 };
      const cartItem = createCartItemElement(objectParam);
      catchSection.appendChild(cartItem);
      calculateItemsValue(objectParam);
      saveCartItems(cart);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.addEventListener('click', () => {
    addToCart(sku);
  });

  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
} */

function removeLoading() {
  loadingContainer.removeChild(loadingContainer.firstElementChild);
  }

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const catchSection = document.querySelector('.items');
    searchData.results.forEach((listItem) => {
      const { id: sku, title: name, thumbnail: image } = listItem;
      const productItem = createProductItemElement({ sku, name, image });
      catchSection.appendChild(productItem);
    });
    removeLoading();
}

function removeAllCartItems() {
  cartItems.innerHTML = '';
  cart.totalPrice = 0;
  totalItems.innerHTML = 0;
  localStorage.clear();
}

removeItems.addEventListener('click', removeAllCartItems);

window.onload = () => {
  searchProducts('computador');
  getSavedCartItems(addToCart); 
};
