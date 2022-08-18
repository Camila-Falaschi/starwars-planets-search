import React from 'react';
import Filters from './Filters';
import Table from './Table';
import './TableSection.css';

function TableSection() {
  return (
    <section className="table-section">
      <label htmlFor="search">
        Projeto Star Wars - Trybe
        <input type="text" id="search" name="search-input" />
      </label>
      <Filters />
      <Table />
    </section>
  );
}

export default TableSection;
