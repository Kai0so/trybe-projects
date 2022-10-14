import React, { useContext, useEffect } from 'react';
import { Header, Footer, CategButtons } from '../../components';
import { SearchContext } from '../../context/search';
import { handleRender12Meals } from '../../helpers/Render-Functions/HandleFoodRenders';
import './Foods.css';

function Foods() {
  const {
    recipes,
    allMeals,
    getAllMeals,
    toggleCateg,
  } = useContext(SearchContext);

  useEffect(() => {
    getAllMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // se eu coloco a dependencia, ele entra em um loop infinito, não mexer.

  return (
    <div className="container">
      <div className="topo box">
        <Header name="Foods" hasSearchIcon hasProfileIcon />
      </div>
      <div className="sidebar box">
        <CategButtons name="Foods" />
      </div>
      <main className="conteudo box">
        {recipes.meals !== undefined
        && recipes.meals.length >= 1
        && toggleCateg.length > 0 ? handleRender12Meals(recipes.meals)
          : handleRender12Meals(allMeals.meals)}

      </main>
      <Footer />
    </div>
  );
}

export default Foods;
