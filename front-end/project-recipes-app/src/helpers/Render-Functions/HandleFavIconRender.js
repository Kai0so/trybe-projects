export function handleRecipeFavoriteStatus(recip) {
  if (recip.idDrink !== undefined) {
    const recipeId = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipeId || recipeId === []) {
      const doesItIncludes = recipeId.some((recipObj) => recipObj.id === recip.idDrink);
      return doesItIncludes;
    }
    return false;
  }
  if (recip.idMeal !== undefined) {
    const recipeId = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipeId || recipeId === []) {
      const doesItIncludes = recipeId.some((recipObj) => recipObj.id === recip.idMeal);
      return doesItIncludes;
    }
    return false;
  }
}

export function handleRecipeFavoriteRemoval(recip) {
  const recipeId = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const removeFillter = recipeId.filter((recipStorage) => recipStorage.id !== recip);
  localStorage.setItem('favoriteRecipes',
    JSON.stringify(removeFillter));
}
