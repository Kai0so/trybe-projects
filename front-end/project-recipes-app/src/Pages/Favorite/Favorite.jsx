import React from 'react';
import { Header } from '../../components';

function Favorite() {
  return (
    <>
      <Header name="Favorite Recipes" hasSearchIcon={ false } hasProfileIcon />
      <div>Recipes</div>
    </>
  );
}

export default Favorite;
