import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';

function Explore() {
  return (
    <>
      <Header name="Explore" hasSearchIcon={ false } hasProfileIcon />
      <div>
        <Link to="/explore/foods">
          <button type="button" data-testid="explore-foods">Explore Foods</button>
        </Link>
        <Link to="/explore/drinks">
          <button type="button" data-testid="explore-drinks">Explore Drinks</button>
        </Link>
        <Footer />
      </div>
    </>
  );
}

export default Explore;
