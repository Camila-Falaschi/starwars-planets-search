import { render } from '@testing-library/react';
import React from 'react';
import PlanetsContext from '../context/PlanetsContext';
import PlanetsProvider from '../context/PlanetsProvider';

const renderWithContext = (component) => ({
  ...render(
    <PlanetsProvider value={ PlanetsContext }>
      {component}
    </PlanetsProvider>,
  ),
});

export default renderWithContext;
