import { LanguageProvider } from '@/contexts/LanguageContext';
import { renderWithProviders } from '../redux/renderWithProviders';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'vitest';

describe('test NotFoundPage component', () => {
  test('should render correct text and img', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <LanguageProvider>
          <NotFoundPage />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong... Error 404. Page not found.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
