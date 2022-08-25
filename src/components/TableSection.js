import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Filters from './Filters';
import Table from './Table';
import './TableSection.css';

function TableSection() {
  const { allfilters, onChangeTextInput, deleteAllFilters,
    onClickDeleteFilter } = useContext(PlanetsContext);
  const { filterByName, filterByNumericValues } = allfilters;

  return (
    <section className="table-section">
      <label htmlFor="search">
        Projeto Star Wars - Trybe
        <input
          type="text"
          data-testid="name-filter"
          id="search"
          name="search-input"
          placeholder="search planet name"
          value={ filterByName.name }
          onChange={ (event) => onChangeTextInput(event) }
        />
      </label>
      <Filters />
      <button
        type="button"
        onClick={ () => deleteAllFilters() }
        data-testid="button-remove-filters"
      >
        Remover Todos os Filtros
      </button>
      {
        filterByNumericValues.map((item, index) => (
          <div key={ index } data-testid="filter">
            <p>
              {`${item.column}  -  ${item.comparison}  -  ${item.value}`}
            </p>
            <button
              type="button"
              onClick={ (e) => onClickDeleteFilter(e) }
              value={ index }
            >
              X
            </button>
          </div>
        ))
      }
      <Table />
    </section>
  );
}

export default TableSection;
