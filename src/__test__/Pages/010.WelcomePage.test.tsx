import { describe } from 'vitest';
import { renderWithProviders } from '../redux/renderWithProviders';
import WelcomePage from '@/pages/WelcomePage/WelcomePage';
import { MemoryRouter } from 'react-router-dom';
import { LanguegeConstant } from '@/constants/languege/languege.constant';
import { screen } from '@testing-library/react';

describe('test WelcomePage', () => {
  test('should render correct data in english', () => {
    renderWithProviders(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>,
      {
        preloadedState: { lang: { lang: LanguegeConstant.EN } },
      },
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in or register/)).toBeInTheDocument();
  });

  test('should render correct data in russian', () => {
    renderWithProviders(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>,
      {
        preloadedState: { lang: { lang: LanguegeConstant.RU } },
      },
    );

    expect(screen.getByText(/Авторизоваться$/i)).toBeInTheDocument();
    expect(screen.getByText(/Зарегистрироваться$/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Авторизуйтесь или зарегистрируйтесь/i),
    ).toBeInTheDocument();
  });
});
