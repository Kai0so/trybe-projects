// import getIngredientsArray from '../IngredientsFunc';

export function handleStorageCompleteRecipes(recipe) {
  const today = new Date();
  const todayDate = `${today.getDate()
  }/${today.getMonth() + 1}/${today.getFullYear()}`;
  const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const alreadyDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (recipe.idDrink) {
    const doneDrinkRecipes = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: todayDate,
      tags: '',
    };
    if (alreadyDoneRecipes) {
      localStorage.setItem(
        'doneRecipes', JSON.stringify([...alreadyDoneRecipes, doneDrinkRecipes]),
      );
      return;
    }
    localStorage.setItem('doneRecipes', JSON.stringify([doneDrinkRecipes]));
    delete inProgressRecipe.cocktails[recipe.idDrink];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
  }
  if (recipe.idMeal !== undefined) {
    const doneMealRecipes = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: todayDate,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };
    if (alreadyDoneRecipes) {
      localStorage.setItem(
        'doneRecipes', JSON.stringify([...alreadyDoneRecipes, doneMealRecipes]),
      );
      return;
    }
    localStorage.setItem('doneRecipes', JSON.stringify([doneMealRecipes]));
    delete inProgressRecipe.meals[recipe.idMeal];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
  }
}

export function handleStorageInProgressRecipes(recipe, step) {
  if (recipe.idDrink !== undefined) {
    const drinkId = recipe.idDrink;
    const drinkStorage = {
      cocktails: {
        [drinkId]: step,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(drinkStorage));
  }
  if (recipe.idMeal !== undefined) {
    const mealId = recipe.idMeal;
    const mealsStorage = {
      meals: {
        [mealId]: step,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(mealsStorage));
  }
}

export function handleStorageFavoriteRecipes(recipe) {
  const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (recipe.idDrink !== undefined) {
    const favoriteDrinkRecipes = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    if (favRecipe) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favRecipe, favoriteDrinkRecipes]));
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrinkRecipes]));
  }
  if (recipe.idMeal !== undefined) {
    const favorieMealRecipes = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    if (favRecipe) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favRecipe, favorieMealRecipes]));
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([favorieMealRecipes]));
  }
}
