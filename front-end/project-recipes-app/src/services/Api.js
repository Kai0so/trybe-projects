export const fetchIngredients = async (ingredient, currentPage) => {
  const ENDPOINT = `https://www.${currentPage}.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchName = async (name, currentPage) => {
  const ENDPOINT = `https://www.${currentPage}.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchFirstLetter = async (letter, currentPage) => {
  const ENDPOINT = `https://www.${currentPage}.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchAllMeals = async () => {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchAllDrinks = async () => {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchFoodCateg = async () => {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchDrinkCateg = async () => {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchFoodCategRecipes = async (category) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchDrinkCategRecipes = async (category) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchOneMealById = async (mealId) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchOneDrinkById = async (drinkId) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const fetchAllNations = async () => {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result.meals;
};

export const fetchFoodByNationalitie = async (nationalitie) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationalitie}`;
  console.log(ENDPOINT);
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result.meals;
};
