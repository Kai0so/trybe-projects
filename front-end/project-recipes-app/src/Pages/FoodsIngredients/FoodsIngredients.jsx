import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../../components';

function FoodsIngredients() {
  const [foodsIngredients, setFoodsIngredients] = useState([]);
  const MAX_CARD_NUMBER = 12;

  const fetchFoodIngredients = async () => {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await result.json();
    setFoodsIngredients(data.meals);
  };

  useEffect(() => { fetchFoodIngredients(); }, []);

  return (
    <>
      <Header name="Explore Ingredients" hasSearchIcon={ false } hasProfileIcon />
      <div>
        {
          foodsIngredients.slice(0, MAX_CARD_NUMBER).map((ingredient, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>
              <img data-testid={ `${index}-card-img` } src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` } alt={ ingredient.strDescription } />
            </button>
          ))
        }
      </div>
      <Footer />
    </>
  );
}

export default FoodsIngredients;
