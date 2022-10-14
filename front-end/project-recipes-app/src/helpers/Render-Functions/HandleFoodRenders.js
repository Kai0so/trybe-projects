import React from 'react';
import { Link } from 'react-router-dom';
import { Food } from '../../components';

export function handleRender12Meals(array, xablau) {
  console.log(xablau);
  const TWELVE = 12;
  if (array !== undefined) {
    return array.map((meal, index) => {
      if (index < TWELVE) {
        return (
          <Link
            to={ `/foods/${meal.idMeal}` }
            key={ meal.idMeal }
          >
            <Food
              meal={ meal }
              key={ meal.idMeal }
              index={ index }
            />
          </Link>
        );
      }
      return null;
    });
  }
}

export function handleRender6Meals(array) {
  const SIX = 6;
  if (array !== undefined) {
    return array.map((meal, index) => {
      if (index < SIX) {
        return (
          <span
            data-testid={ `${index}-recomendation-card` }
            key={ meal.idMeal }
          >
            <Link
              to={ `/foods/${meal.idMeal}` }
            >
              <Food
                meal={ meal }
                key={ meal.idMeal }
                index={ index }
              />
            </Link>
          </span>
        );
      }
      return null;
    });
  }
}
