import React, { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../../context/search';
import { Header, Footer } from '../../components';
import { fetchAllNations, fetchFoodByNationalitie } from '../../services/Api';
import { handleRender12Meals } from '../../helpers/Render-Functions/HandleFoodRenders';

function Nationalities() {
  const {
    allMeals,
    getAllMeals,
  } = useContext(SearchContext);

  const [dropOptions, setDropOptions] = useState([]);
  const [nation, setNation] = useState('');
  const [recipesByNation, setRecipesByNation] = useState([]);

  const getNations = async () => {
    const all = await fetchAllNations();
    const nations = all.map((elem) => elem.strArea);
    console.log(nations);
    setDropOptions(nations);
  };

  useEffect(() => {
    getAllMeals();
    getNations();
  }, []);

  const getFoodByNation = async (selectValue) => {
    console.log(selectValue);
    setNation(selectValue);
    if (selectValue !== 'All' && selectValue !== undefined) {
      const theNation = await fetchFoodByNationalitie(selectValue);
      return setRecipesByNation(theNation);
    }
    getAllMeals();
  };
  console.log(nation, recipesByNation);
  return (
    <>
      <Header name="Explore Nationalities" hasSearchIcon hasProfileIcon />
      <select
        type="select"
        data-testid="explore-by-nationality-dropdown"
        value={ nation }
        onChange={ ({ target }) => getFoodByNation(target.value) }
      >
        <option data-testid="All-option" value="All" selected>All</option>
        { dropOptions.map((opt) => (
          <option
            key={ Math.random() }
            data-testid={ `${opt}-option` }
            value={ opt }
          >
            { opt }
          </option>
        ))}
      </select>
      <section>
        { recipesByNation === undefined
        || nation === ''
        || nation === 'All' ? handleRender12Meals(allMeals.meals, 'xablau')
          : handleRender12Meals(recipesByNation, 'outro')}
      </section>
      <Footer />
    </>
  );
}

export default Nationalities;
