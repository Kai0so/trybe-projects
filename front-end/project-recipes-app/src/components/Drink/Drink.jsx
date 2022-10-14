import React from 'react';
import PropTypes from 'prop-types';

function Drink({ drink, index }) {
  return (
    <button type="button" data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
      <img
        data-testid={ `${index}-card-img` }
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
    </button>
  );
}

Drink.propTypes = {
  drink: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default Drink;
