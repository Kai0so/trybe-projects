 /* --------OUTRA FORMA DE FAZER fetchProducts---------
const fetchProducts = (productToFind) => {
   return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${productToFind}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error)
} */

const fetchProducts = async (productToFind) => {
   try {
    const resp = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${productToFind}`);
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
