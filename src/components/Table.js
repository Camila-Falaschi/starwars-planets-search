import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Table.css';

function Table() {
  const { tableInfo, headersNames, setPlanetsList, setTableInfo,
    setHeadersNames } = useContext(PlanetsContext);

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

  useEffect(() => { getPlanetsInfo(); }, []);

  return (
    <table className="table-sheets">
      <thead>
        <tr>
          {headersNames.map((item, index) => (
            <th className="table-headers" key={ index }>
              {item}
            </th>))}
        </tr>
      </thead>
      <tbody className="scroll">
        {tableInfo.map((item) => {
          const valuesArray = Object.values(item);
          return (
            <tr key={ valuesArray[0] }>
              {valuesArray.map((element, index) => (
                <td key={ `${valuesArray[3]}${index}` }>
                  {element}
                </td>))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
