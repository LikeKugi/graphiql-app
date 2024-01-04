import { afterEach, describe, expect } from 'vitest';
import { renderWithProviders } from '../redux/renderWithProviders';
import WelcomePage from '@/pages/WelcomePage/WelcomePage';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext/LanguageContext';
import * as Firebase from 'react-firebase-hooks/auth';
import { User } from '@/__test__/types/User.types';

describe('test WelcomePage', () => {
  const authSpy = vi.spyOn(Firebase, 'useAuthState');

  afterEach(() => {
    cleanup();
    authSpy.mockClear();
  });

  test('should render correct data for unauthorized user', () => {
    authSpy.mockReturnValue([null, false, {} as unknown as Error]);

    renderWithProviders(
      <MemoryRouter>
        <LanguageProvider>
          <WelcomePage />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByText(/language/i)).toBeInTheDocument();
    expect(screen.getByText(/Members/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Oleg/i)).toHaveLength(2);
    expect(screen.getAllByText(/Andrii/i)).toHaveLength(2);
    expect(screen.getAllByText(/Elijah/i)).toHaveLength(2);
    expect(screen.getAllByRole('img')).toHaveLength(5);
  });

  it('should render correct data for authorized user', function () {
    authSpy.mockReturnValue([
      {} as unknown as User,
      false,
      {} as unknown as Error,
    ]);

    renderWithProviders(
      <MemoryRouter>
        <LanguageProvider>
          <WelcomePage />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/main\spage/i)).toBeInTheDocument();
  });
});
