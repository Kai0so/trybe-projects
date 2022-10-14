import React from 'react';
import PropTypes from 'prop-types';

function Food({ meal, index }) {
  return (
    <button type="button" data-testid={ `${index}-recipe-card` } id="card-content">
      <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
      <img
        data-testid={ `${index}-card-img` }
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
    </button>
  );
}

Food.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default Food;
