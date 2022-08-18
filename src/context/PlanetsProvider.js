import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { Provider } = PlanetsContext;

  const [planetsList, setPlanetsList] = useState([]);
  const [headersNames, setHeadersNames] = useState([]);

  // para a constante 'planets' foi consultado o Stack Overflow (https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6)
  async function getPlanetsInfo() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await response.json();
    const planets = data.results.map((element) => Object.keys(element)
      .filter((key) => key !== 'residents')
      .reduce((acc, key) => ({
        ...acc,
        [key]: element[key],
      }), {}));

    setPlanetsList(planets);

    const keysNames = Object.keys(planets[0]).map((name) => name.replace(/_/g, ' '));
    setHeadersNames(keysNames);
  }

  const contextValue = {
    planetsList,
    getPlanetsInfo,
    headersNames,
  };

  return (
    <Provider value={ contextValue }>
      {children}
    </Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
