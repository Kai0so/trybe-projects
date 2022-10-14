import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const {
    data,
    nameFilter,
    numberFilter,
    filteredPlanets,
    optionElements,
    setNameFilter,
    setNumberFilter,
    setFilteredPlanets,
    setOptionElements } = useContext(PlanetContext);

  const handleChange = ({ target: { id, value } }) => {
    if (id !== 'name') {
      setNumberFilter({ ...numberFilter, [id]: value });
    } else {
      setNameFilter({ [id]: value });
    }
  };

  const filterPlanets = () => {
    const { column, comparison, value } = numberFilter;
    let planetFilter = [];
    if (filteredPlanets.length !== 0) {
      switch (comparison) {
      case 'maior que':
        planetFilter = filteredPlanets
          .filter((planet) => planet[column] > parseFloat(value));
        break;
      case 'menor que':
        planetFilter = filteredPlanets
          .filter((planet) => planet[column] < parseFloat(value));
        break;
      case 'igual a':
        planetFilter = filteredPlanets
          .filter((planet) => planet[column] === value);
        break;
      default:
        console.log('oi');
      }
    } else {
      switch (comparison) {
      case 'maior que':
        planetFilter = data
          .filter((planet) => planet[column] > parseFloat(value));
        break;
      case 'menor que':
        planetFilter = data
          .filter((planet) => planet[column] < parseFloat(value));
        break;
      case 'igual a':
        planetFilter = data
          .filter((planet) => planet[column] === value);
        break;
      default:
        console.log('oi');
      }
    }
    setOptionElements(optionElements.filter((e) => e !== column));
    return planetFilter;
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        id="name"
        onChange={ handleChange }
      />
      <select
        data-testid="column-filter"
        id="column"
        value={ numberFilter.column }
        onChange={ handleChange }
      >
        { optionElements.map((option, index) => (
          <option
            key={ index }
            value={ option }
          >
            { option }
          </option>
        )) }
      </select>
      <select
        data-testid="comparison-filter"
        value={ numberFilter.comparison }
        id="comparison"
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ numberFilter.value }
        id="value"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setFilteredPlanets(filterPlanets) }
      >
        Add Filter
      </button>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.length !== 0
            ? filteredPlanets.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
            : data.filter((planet) => planet.name.toLowerCase()
              .includes(nameFilter.name.toLowerCase()))
              .map((planet, index) => (
                <tr key={ index }>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
