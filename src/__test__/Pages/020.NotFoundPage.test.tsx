import { LanguageProvider } from '@/contexts/LanguageContext';
import { renderWithProviders } from '../redux/renderWithProviders';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { screen } from '@testing-library/react';

describe('test NotFoundPage component', () => {
  test('should render correct text and img', () => {
    renderWithProviders(
      <LanguageProvider>
        <NotFoundPage />
      </LanguageProvider>,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong... Error 404. Page not found.'),
    ).toBeInTheDocument();
  });
});
