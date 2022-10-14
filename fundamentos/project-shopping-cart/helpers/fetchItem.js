const fetchItem = async (id) => {
  try {
    const resp = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
