import React, { useContext, useLayoutEffect, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../../../context/search';
import shareIcon from '../../../images/shareIcon.svg';
import notFavorite from '../../../images/whiteHeartIcon.svg';
import isFavorite from '../../../images/blackHeartIcon.svg';
import getIngredientsArray from
'../../../helpers/Ingredient-Measure-Functions/IngredientsFunc';
import getIngredientMeasure from
'../../../helpers/Ingredient-Measure-Functions/MeasureFunc';
import {
  handleStorageFavoriteRecipes,
  handleStorageInProgressRecipes,
  handleStorageCompleteRecipes,
} from '../../../helpers/localStorage/Storage';
import { handleRecipeFavoriteStatus, handleRecipeFavoriteRemoval }
from '../../../helpers/Render-Functions/HandleFavIconRender';

function InProgressFood() {
  const {
    meal,
    getOneMeal,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
  } = useContext(SearchContext);

  const [message, setMessage] = useState(false);
  const [favIcon, setFavIcon] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState([]);

  const url = window.location.href;
  const history = useHistory();

  useLayoutEffect(() => {
    function getMealIdFromUrlAndCallFetch() {
      const FOUR = 4;
      const NINE = 9;
      const urlNumbers = url.replace(/\D/g, '');
      const urlId = urlNumbers.slice(FOUR, NINE);
      getOneMeal(urlId);
    }
    getMealIdFromUrlAndCallFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(meal)[0] === 'meals') {
      setIngredients(getIngredientsArray(meal.meals[0]));
      setMeasures(getIngredientMeasure(meal.meals[0]));
      setFavIcon(handleRecipeFavoriteStatus(meal.meals[0]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meal]);

  // useEffect(() => {
  //   console.log('useEffect foi chamado', checkedSteps);
  //   handleStorageInProgressRecipes(meal, checkedSteps);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [checkedSteps]); atualiza o estado mas não manda corretamente para o storage

  function handleCopy() {
    const THREE_SEC = 2000;
    setMessage(true);
    const correctUrl = url.split('/in-progress');
    navigator.clipboard.writeText(correctUrl[0]);
    setTimeout(() => setMessage(false), THREE_SEC);
  }

  function handleFavIconToggle(oneMeal) {
    if (favIcon) {
      handleRecipeFavoriteRemoval(oneMeal.idMeal);
      setFavIcon((prevState) => !prevState);
      return;
    }
    setFavIcon((prevState) => !prevState);
  }

  function handleStepsArray(e) {
    const { value } = e.target;
    if (checkedSteps.some((step) => step === value)) {
      setCheckedSteps((prevState) => prevState.filter((step) => step !== value));
      return;
    }
    setCheckedSteps((prevState) => [...prevState, value]);
  }

  function handleRender(oneMeal, allIngredients, allMeasures) {
    return (
      <section>
        <h1 data-testid="recipe-title">{oneMeal.strMeal}</h1>
        <img
          data-testid="recipe-photo"
          src={ oneMeal.strMealThumb }
          alt={ oneMeal.strMeal }
        />
        {message ? <span>Link copied!</span> : null}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => handleCopy() }
        >
          <img
            src={ shareIcon }
            alt="share"
          />
        </button>
        <button
          type="button"
          onClick={ () => {
            handleStorageFavoriteRecipes(oneMeal);
            handleFavIconToggle(oneMeal);
          } }
        >
          {favIcon ? (
            <img
              src={ isFavorite }
              alt="favorite"
              data-testid="favorite-btn"
            />
          ) : (
            <img
              src={ notFavorite }
              alt="favorite"
              data-testid="favorite-btn"
            />
          )}
        </button>
        <h3 data-testid="recipe-category">{oneMeal.strCategory}</h3>
        <article>
          <ul>
            { allIngredients.map((ingredient, index) => (
              <li key={ index }>
                <label
                  htmlFor="ingredient"
                  data-testid={ `data-testid=${index}-ingredient-step` }
                >
                  <input
                    id="ingredient"
                    type="checkbox"
                    value={ `${ingredient}  ${allMeasures[index]}` }
                    onChange={ (e) => {
                      handleStepsArray(e);
                      handleStorageInProgressRecipes(oneMeal, checkedSteps); // Está funcionando pero no mucho, não dá tempo de atualizar o estado do passo mas está setando ok, e o use effect n funciona.
                    } }
                  />
                  {`${ingredient}  ${allMeasures[index]}`}
                </label>
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{oneMeal.strInstructions}</p>
        </article>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
          disabled={ ingredients.length !== checkedSteps.length }
          onClick={ () => {
            handleStorageCompleteRecipes(meal.meals[0]);
            history.push('/done-recipes');
          } }
        >
          Finish Recipe
        </button>
      </section>
    );
  }
  return (
    <>
      {Object.keys(meal)[0] === 'meals'
        ? handleRender(meal.meals[0], ingredients, measures)
        : <p>loading...</p>}
      <p style={ { display: 'none' } }>so para funcionar</p>
    </>
  );
}

export default InProgressFood;
