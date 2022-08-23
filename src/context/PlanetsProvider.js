import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { Provider } = PlanetsContext;

  const [planetsList, setPlanetsList] = useState([]);
  const [headersNames, setHeadersNames] = useState([]);
  const [tableInfo, setTableInfo] = useState([]);
  const [columnSelect, setColumnSelect] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [comparisonSelect, setComparisonSelect] = useState(['maior que',
    'menor que', 'igual a']);
  const [allfilters, setAllFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });
  const [filterNumericValues, setFilterNumericValues] = useState({
    column: columnSelect[0],
    comparison: comparisonSelect[0],
    value: '0',
  });

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
    setTableInfo(planets);

    const keysNames = Object.keys(planets[0]).map((name) => name.replace(/_/g, ' '));
    setHeadersNames(keysNames);
  }

  function onChangeTextInput({ target }) {
    const { value } = target;

    const filterName = planetsList.filter((element) => element.name
      .toLowerCase().includes(value.toLowerCase()));

    setTableInfo(filterName);
    setAllFilters({
      ...allfilters,
      filterByName: {
        name: value,
      },
    });
  }

  function onChangeFilterSelectors({ target }) {
    const { value, name } = target;

    setFilterNumericValues({
      ...filterNumericValues,
      [name]: value,
    });
  }

  function onClickFilters() {
    const { column, comparison, value } = filterNumericValues;

    const filterList = planetsList.filter((item) => {
      console.log(item[column]);

      if (comparison === 'maior que') {
        return (Number(item[column]) > value && item[column] !== 'unknown');
      }
      if (comparison === 'menor que') {
        return (Number(item[column]) < value && item[column] !== 'unknown');
      }
      return (item[column] === String(value) && item[column] !== 'unknown');
    });

    setTableInfo(filterList);

    setAllFilters({
      ...allfilters,
      filterByNumericValues: [...allfilters.filterByNumericValues,
        { ...filterNumericValues }],
    });
  }

  const contextValue = {
    planetsList,
    headersNames,
    tableInfo,
    allfilters,
    filterNumericValues,
    columnSelect,
    setColumnSelect,
    comparisonSelect,
    setComparisonSelect,
    getPlanetsInfo,
    onChangeTextInput,
    onChangeFilterSelectors,
    onClickFilters,
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
