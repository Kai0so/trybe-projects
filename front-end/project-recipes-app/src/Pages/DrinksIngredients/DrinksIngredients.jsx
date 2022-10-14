import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../../components';

function DrinksIngredients() {
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const MAX_CARD_NUMBER = 12;

  const fetchDrinksIndredients = async () => {
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const data = await result.json();
    setDrinksIngredients(data.drinks);
  };

  useEffect(() => { fetchDrinksIndredients(); }, []);

  return (
    <>
      <Header name="Explore Ingredients" hasSearchIcon={ false } hasProfileIcon />
      <div>
        {
          drinksIngredients.slice(0, MAX_CARD_NUMBER).map((ingredient, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
              <img data-testid={ `${index}-card-img` } src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` } alt={ ingredient.strIngredient1 } />
            </button>
          ))
        }
      </div>
      <Footer />
    </>
  );
}

export default DrinksIngredients;
