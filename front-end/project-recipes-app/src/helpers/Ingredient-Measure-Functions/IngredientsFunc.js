export default function getIngredientsArray(recipe) {
  const recipeArray = Object.entries(recipe);
  const ingredientArray = recipeArray.map((key) => {
    if (!key[0].includes('ngredient')) {
      return null;
    }
    return key[1];
  }).filter((theIngredient) => theIngredient !== null);
  const ingredientFillter = ingredientArray
    .filter((theIngredient) => theIngredient !== '');
  return ingredientFillter;
}
