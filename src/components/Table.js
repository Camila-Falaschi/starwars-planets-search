import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Table.css';

function Table() {
  const { tableInfo, getPlanetsInfo, headersNames } = useContext(PlanetsContext);

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
