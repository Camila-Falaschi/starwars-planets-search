import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Filters from './Filters';
import Table from './Table';
import './TableSection.css';

function TableSection() {
  const { allfilters, onChangeTextInput } = useContext(PlanetsContext);
  const { filterByName } = allfilters;

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
      <Table />
    </section>
  );
}

export default TableSection;
