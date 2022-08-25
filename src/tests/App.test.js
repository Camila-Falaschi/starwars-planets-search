import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import apiResponse from './mock';

describe('The application', () => {
  it('should have a way to search the planet by typing and buttons to filter the table sheet.',
    () => {
      global.fetch = jest.fn(async () => ({
        json: async () => ({ results: apiResponse }),
      }));

      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>,
      );

      const title = screen.getByText(/Projeto Star Wars - Trybe/i);
      expect(title).toBeInTheDocument();

      const searchBar = screen.getByTestId('name-filter');
      expect(searchBar).toBeDefined();

      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const numberFilter = screen.getByTestId('value-filter');
      expect(columnFilter).toBeDefined();
      expect(comparisonFilter).toBeDefined();
      expect(numberFilter).toBeDefined();

      const buttonFilter = screen.getByTestId('button-filter');
      const removeAllFilters = screen.getByTestId('button-remove-filters');
      expect(buttonFilter).toBeDefined();
      expect(removeAllFilters).toBeDefined();

      // const planetTatooine = await screen.getByRole('cell', {name: 'Tatooine'});
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
    });
});
