import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../../components/index';

function ExploreFoods({ history }) {
  const fetchRandomMeal = async () => {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await result.json();
    const randomId = data.meals[0].idMeal;
    history.push(`/foods/${randomId}`);
  };

  return (
    <>
      <Header name="Explore Ingredients" hasSearchIcon={ false } hasProfileIcon />
      <div>
        <Link to="/explore/foods/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ fetchRandomMeal }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ExploreFoods;
