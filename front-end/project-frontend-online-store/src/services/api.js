export async function getCategories() {
  try {
    const apiRequest = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const apiResult = await apiRequest.json();
    return apiResult;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(query) {
  try {
    const apiRequest = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const apiResult = await apiRequest.json();
    return apiResult;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategory(id) {
  try {
    const apiRequest = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
    const apiResult = await apiRequest.json();
    return apiResult;
  } catch (error) {
    return error;
  }
}

export async function getProductFromId(id) {
  try {
    const apiRequest = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const apiResult = await apiRequest.json();
    return apiResult;
  } catch (error) {
    return error;
  }
}
