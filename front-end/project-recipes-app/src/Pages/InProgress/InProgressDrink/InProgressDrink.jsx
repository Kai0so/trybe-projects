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
    drink,
    getOneDrink,
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
      const TEN = 10;
      const urlNumbers = url.replace(/\D/g, '');
      const urlId = urlNumbers.slice(FOUR, TEN);
      getOneDrink(urlId);
    }
    getMealIdFromUrlAndCallFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(drink)[0] === 'drinks') {
      setIngredients(getIngredientsArray(drink.drinks[0]));
      setMeasures(getIngredientMeasure(drink.drinks[0]));
      setFavIcon(handleRecipeFavoriteStatus(drink.drinks[0]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drink]);

  function handleCopy() {
    const THREE_SEC = 2000;
    setMessage(true);
    const correctUrl = url.split('/in-progress');
    navigator.clipboard.writeText(correctUrl[0]);
    setTimeout(() => setMessage(false), THREE_SEC);
  }

  function handleFavIconToggle(oneDrink) {
    if (favIcon) {
      handleRecipeFavoriteRemoval(oneDrink.idDrink);
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

  function handleRender(oneDrink, allIngredients, allMeasures) {
    return (
      <section>
        <h1 data-testid="recipe-title">{oneDrink.strDrink}</h1>
        <img
          data-testid="recipe-photo"
          src={ oneDrink.strDrinkThumb }
          alt={ oneDrink.strDrink }
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
            handleStorageFavoriteRecipes(oneDrink);
            handleFavIconToggle(oneDrink);
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
        <h3 data-testid="recipe-category">{oneDrink.strCategory}</h3>
        <article>
          <ul>
            { allIngredients.map((ingredient, index) => (
              <li key={ index }>
                <label
                  data-testid={ `data-testid=${index}-ingredient-step` }
                  htmlFor="ingredient"
                >
                  <input
                    id="ingredient"
                    type="checkbox"
                    value={ `${ingredient}  ${allMeasures[index]}` }
                    onChange={ (e) => {
                      handleStepsArray(e);
                      handleStorageInProgressRecipes(oneDrink, checkedSteps);
                    } }
                  />
                  {`${ingredient}  ${allMeasures[index]}`}
                </label>
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{oneDrink.strInstructions}</p>
        </article>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
          disabled={ ingredients.length !== checkedSteps.length }
          onClick={ () => {
            handleStorageCompleteRecipes(drink.drinks[0]);
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
      {Object.keys(drink)[0] === 'drinks'
        ? handleRender(drink.drinks[0], ingredients, measures)
        : <p>loading...</p>}
      <p style={ { display: 'none' } }>so para funcionar</p>
    </>
  );
}

export default InProgressFood;
