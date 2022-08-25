import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import apiResponse from './APImock';
import renderWithContext from './renderWithContext';

describe('The application', () => {
  it('should have a way to search the planet by typing and buttons to filter the table sheet.',
    () => {
      renderWithContext(
        <App />,
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
    });
  it('should show the table values', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiResponse),
    });
    renderWithContext(
      <App />,
    );

    const four = 4;
    const three = 3;

    await waitFor(() => {
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const numberFilter = screen.getByTestId('value-filter');
      const buttonFilter = screen.getByTestId('button-filter');
      const removeAllFilters = screen.getByTestId('button-remove-filters');

      const searchBar = screen.getByTestId('name-filter');

      const planetTatooine = screen.getByText('Tatooine');
      expect(planetTatooine).toBeDefined();

      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.type(numberFilter, '10000');
      userEvent.click(buttonFilter);

      expect(planetTatooine).not.toBeInTheDocument();

      const rows1stFilter = screen.getAllByRole('row');
      expect(rows1stFilter.length).toBe(four);

      const buttonXTestId = screen.getByTestId('filter');
      expect(buttonXTestId).toBeDefined();

      userEvent.click(removeAllFilters);

      userEvent.type(searchBar, 'oo');
      expect(screen.getByText('Naboo')).toBeDefined();

      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.type(numberFilter, '10000');
      userEvent.click(buttonFilter);

      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.type(numberFilter, '0');
      userEvent.click(buttonFilter);

      const buttonX = screen.getAllByRole('button', { value: 'X' });

      userEvent.click(buttonX[1]);
      userEvent.click(buttonX[0]);

      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.type(numberFilter, '1000');
      userEvent.click(buttonFilter);
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });
});
