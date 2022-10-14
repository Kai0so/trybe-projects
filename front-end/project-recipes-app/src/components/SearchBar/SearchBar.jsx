import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../../context/search';

function SearchBar({ name }) {
  const [searchInput, setSearchInput] = useState('');
  const [radio, setRadio] = useState('');
  const history = useHistory();

  const {
    SearchByIngredient,
    SearchByName,
    SearchByLetter,
    setCurrentPage,
    recipes,
  } = useContext(SearchContext);

  useEffect(() => {
    if (name.includes('rink')) {
      setCurrentPage('thecocktaildb');
    } // Gambi nossa de cada dia para ignorar o case sensitive do método includes
    if (name.includes('ood')) {
      setCurrentPage('themealdb');
    }
  }, [name, setCurrentPage]);

  useEffect(() => {
    if (recipes.drinks !== undefined && recipes.drinks.length === 1) {
      history.push(`/drinks/${recipes.drinks[0].idDrink}`);
    }
    if (recipes.meals !== undefined && recipes.meals.length === 1) {
      history.push(`/foods/${recipes.meals[0].idMeal}`);
    }
  }, [recipes, history]);

  function handleSearch() {
    if (radio === 'ingredient') {
      SearchByIngredient(searchInput);
    }
    if (radio === 'name') {
      SearchByName(searchInput);
    }
    if (radio === 'letter' && searchInput.length === 1) {
      SearchByLetter(searchInput);
    }
    if (radio === 'letter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  }

  return (
    <nav>
      <input
        name="search-input"
        type="search"
        value={ searchInput }
        onChange={ (e) => {
          setSearchInput(e.target.value);
        } }
        placeholder="Search for a recipe..."
        data-testid="search-input"
      />

      <label htmlFor="ingredient">
        Ingredient
        <input
          name="search-radio"
          type="radio"
          onClick={ () => setRadio('ingredient') }
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          name="search-radio"
          type="radio"
          onClick={ () => setRadio('name') }
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="letter">
        First Letter
        <input
          name="search-radio"
          type="radio"
          onClick={ () => setRadio('letter') }
          data-testid="first-letter-search-radio"
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          handleSearch();
        } }
      >
        Search
      </button>

    </nav>
  );
}

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchBar;
