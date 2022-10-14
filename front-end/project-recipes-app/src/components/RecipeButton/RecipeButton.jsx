import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { handleStorageInProgressRecipes } from '../../helpers/localStorage/Storage';
import {
  handleRecipeInProgressStatus,
  handleRecipeCompleteStatus,
} from '../../helpers/Render-Functions/HandleRecipeStatusButton';
import { SearchContext } from '../../context/search';

export default function RecipeButton({ recipe, currentUrl }) {
  const {
    setRecipeUrl,
  } = useContext(SearchContext);

  const history = useHistory();
  function handleRender(currentRecipe) {
    if (handleRecipeInProgressStatus(currentRecipe) === true) {
      return 'Continue Recipe';
    }
    return 'Start Recipe';
  }

  function handleRedirect(currentRecipe) {
    if (currentRecipe.idMeal) {
      history.push(`/foods/${currentRecipe.idMeal}/in-progress`);
    }
    if (currentRecipe.idDrink) {
      history.push(`/drinks/${currentRecipe.idDrink}/in-progress`);
    }
  }

  return (
    <>
      { handleRecipeCompleteStatus(recipe) === false
        ? (
          <button
            data-testid="start-recipe-btn"
            type="button"
            style={ { position: 'fixed', bottom: '0px' } }
            onClick={ () => {
              handleStorageInProgressRecipes(recipe);
              handleRedirect(recipe);
              setRecipeUrl(currentUrl);
            } }
          >
            {handleRender(recipe)}
          </button>) : null}
      <p style={ { display: 'none' } }>so para funcionar</p>
    </>
  );
}

RecipeButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  currentUrl: PropTypes.string.isRequired,
};
