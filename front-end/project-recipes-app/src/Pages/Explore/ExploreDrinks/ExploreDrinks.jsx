import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../../components/index';

function ExploreDrinks({ history }) {
  const fetchRandomDrink = async () => {
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await result.json();
    const randomId = data.drinks[0].idDrink;
    history.push(`/drinks/${randomId}`);
  };

  return (
    <>
      <Header name="Explore Ingredients" hasSearchIcon={ false } hasProfileIcon />
      <div>
        <Link to="/explore/drinks/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ fetchRandomDrink }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ExploreDrinks;
