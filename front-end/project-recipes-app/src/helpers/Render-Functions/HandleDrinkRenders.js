import React from 'react';
import { Link } from 'react-router-dom';
import { Drink } from '../../components';

export function handleRender12Drinks(array) {
  const TWELVE = 12;
  if (array !== undefined) {
    return array.map((drink, index) => {
      if (index < TWELVE) {
        return (
          <Link
            to={ `/drinks/${drink.idDrink}` }
            key={ drink.idDrink }
          >
            <Drink
              drink={ drink }
              key={ drink.idDrink }
              index={ index }
            />
          </Link>
        );
      }
      return null;
    });
  }
}

export function handleRender6Drinks(array) {
  const SIX = 6;
  if (array !== undefined) {
    return array.map((drink, index) => {
      if (index < SIX) {
        return (
          <span
            data-testid={ `${index}-recomendation-card` }
            key={ drink.idDrink }
          >
            <Link to={ `/drinks/${drink.idDrink}` }>
              <Drink
                drink={ drink }
                key={ drink.idDrink }
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
