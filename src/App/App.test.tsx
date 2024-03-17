import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders all sections', () => {
  render(<App />);
  const localSection = screen.getByText(/Local Data - synchronous/i);
  const localAsyncSection = screen.getByText(/Local Data - asynchronous/i);
  const localAsyncErrorSection = screen.getByText(/Local Data - async – error state/i);
  const apiCallSection = screen.getByText(/API Call/i);
  expect(localSection).toBeInTheDocument();
  expect(localAsyncSection).toBeInTheDocument();
  expect(localAsyncErrorSection).toBeInTheDocument();
  expect(apiCallSection).toBeInTheDocument();
});
