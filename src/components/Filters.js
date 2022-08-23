import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import CreateSelectTag from './CreateSelectTag';
// import './TableSection.css';

function Filters() {
  const { filterNumericValues, onChangeFilterSelectors,
    onClickFilters, columnSelect, comparisonSelect } = useContext(PlanetsContext);

  return (
    <div>
      <div>
        <CreateSelectTag
          name="column"
          testId="column-filter"
          optionsArray={ columnSelect }
          onChangeFunction={ onChangeFilterSelectors }
        />
        <CreateSelectTag
          name="comparison"
          testId="comparison-filter"
          optionsArray={ comparisonSelect }
          onChangeFunction={ onChangeFilterSelectors }
        />
        <label htmlFor="number-search">
          <input
            type="number"
            data-testid="value-filter"
            id="number-search"
            name="value"
            value={ filterNumericValues.value }
            onChange={ onChangeFilterSelectors }
          />
        </label>
        <button type="button" onClick={ onClickFilters } data-testid="button-filter">
          Filtrar
        </button>
      </div>
    </div>
  );
}

export default Filters;
