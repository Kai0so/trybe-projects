import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchAPI from '../services/fetchAPI';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState({ name: '' });
  const [numberFilter, setNumberFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [optionElements, setOptionElements] = useState(
    [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  );

  const fetchPlanets = async () => {
    const result = await fetchAPI();
    setData(result);
  };

  useEffect(() => { fetchPlanets(); }, []);

  return (
    <main>
      <PlanetContext.Provider
        value={ {
          data,
          nameFilter,
          numberFilter,
          filteredPlanets,
          optionElements,
          setNameFilter,
          setNumberFilter,
          setFilteredPlanets,
          setOptionElements,
        } }
      >
        {children}
      </PlanetContext.Provider>
    </main>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetProvider;
