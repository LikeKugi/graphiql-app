import { describe } from 'vitest';
import { renderWithProviders } from '../redux/renderWithProviders';
import WelcomePage from '@/pages/WelcomePage/WelcomePage';
import { MemoryRouter } from 'react-router-dom';
import { languageConstants } from '@/constants/language/language.constants';
import { screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext/LanguageContext';

describe('test WelcomePage', () => {
  test('should render correct data in english', () => {
    renderWithProviders(
      <MemoryRouter>
        <LanguageProvider>
          <WelcomePage />
        </LanguageProvider>
      </MemoryRouter>,
      {
        preloadedState: { lang: { lang: languageConstants.EN } },
      },
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in or register/)).toBeInTheDocument();
  });

  test('should render correct data in russian', () => {
    renderWithProviders(
      <MemoryRouter>
        <LanguageProvider>
          <WelcomePage />
        </LanguageProvider>
      </MemoryRouter>,
      {
        preloadedState: { lang: { lang: languageConstants.RU } },
      },
    );

    expect(screen.getByText(/Авторизоваться$/i)).toBeInTheDocument();
    expect(screen.getByText(/Зарегистрироваться$/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Авторизуйтесь или зарегистрируйтесь/i),
    ).toBeInTheDocument();
  });
});
