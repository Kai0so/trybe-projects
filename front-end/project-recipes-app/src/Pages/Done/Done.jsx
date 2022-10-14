import React, { useLayoutEffect, useState } from 'react';
import { Header } from '../../components';
import shareIcon from '../../images/shareIcon.svg';

function Done() {
  const [allDoneRecipes, setAllRecipes] = useState([]);
  const [message, setMessage] = useState(false);

  useLayoutEffect(() => {
    setAllRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  function handleCopy(id, type) {
    const THREE_SEC = 2000;
    setMessage(true);
    const url = window.location.href.split('done-recipes');
    const recipeUrl = `${url[0]}${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setTimeout(() => setMessage(false), THREE_SEC);
  }

  function handleRender() {
    return (
      <>
        <nav>
          <button data-testid="filter-by-all-btn" type="button">All</button>
          <button data-testid="filter-by-food-btn" type="button">Food</button>
          <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
        </nav>
        <main>
          {allDoneRecipes.map((recipe, index) => (
            <div key={ index }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.type === 'drink'
                  ? recipe.alcoholicOrNot
                  : `${recipe.nationality} - ${recipe.category}`}

              </h4>
              <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              {message ? <span>Link copied!</span> : null}
              <button
                type="button"
                onClick={ () => {
                  handleCopy(recipe.id, recipe.type);
                } }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share"
                />
              </button>

              {recipe.tags && recipe.tags.map((tag) => (
                <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ index }>
                  {tag}
                </p>
              ))}

            </div>
          ))}
        </main>
      </>
    );
  }
  return (
    <>
      <Header name="Done Recipes" hasSearchIcon={ false } hasProfileIcon />
      { allDoneRecipes ? handleRender() : <p>carregando</p>}
    </>
  );
}

export default Done;
