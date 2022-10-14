import React, { useContext, useEffect } from 'react';
import { Header, Footer, CategButtons } from '../../components';
import { SearchContext } from '../../context/search';
import { handleRender12Drinks } from '../../helpers/Render-Functions/HandleDrinkRenders';

function Drinks() {
  const {
    recipes,
    allDrinks,
    getAllDrinks,
    toggleCateg,
  } = useContext(SearchContext);

  useEffect(() => {
    getAllDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="topo box">
        <Header name="Drinks" hasSearchIcon hasProfileIcon />
      </div>
      <div className="sidebar box">
        <CategButtons name="Drinks" />
      </div>
      <main className="conteudo box">
        {recipes.drinks !== undefined
        && recipes.drinks.length >= 1
        && toggleCateg.length > 0 ? handleRender12Drinks(recipes.drinks)
          : handleRender12Drinks(allDrinks.drinks)}
      </main>
      <Footer />
    </>
  );
}

export default Drinks;
