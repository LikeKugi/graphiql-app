import { afterEach, describe, expect, test } from 'vitest';
import { act, cleanup, screen } from '@testing-library/react';
import { renderWithProviders } from '../redux/renderWithProviders';
import Header from '@/components/Header/Header';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '@/contexts/LanguageContext/LanguageContext';

import * as Firebase from 'react-firebase-hooks/auth';
import * as Language from '@/contexts/LanguageContext';
import { User } from '@/__test__/types/User.types';

describe('test Header component', () => {
  const authSpy = vi.spyOn(Firebase, 'useAuthState');
  const langSpy = vi.spyOn(Language, 'useLanguage');

  afterEach(() => {
    cleanup();
    authSpy.mockClear();
    langSpy.mockClear();
  });

  test('should render correct data with english', () => {
    authSpy.mockReturnValue([
      {} as unknown as User,
      false,
      {} as unknown as Error,
    ]);

    renderWithProviders(
      <MemoryRouter>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/language/i)).toHaveLength(2);
    expect(screen.getByText(/English/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  test.skip('should render correct data with russian', () => {
    authSpy.mockReturnValue([
      {} as unknown as User,
      false,
      {} as unknown as Error,
    ]);

    renderWithProviders(
      <MemoryRouter>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/Язык/i)).toHaveLength(1);
    expect(screen.getByText(/Русский/i)).toBeInTheDocument();
    expect(screen.getByText(/Домой/i)).toBeInTheDocument();
    expect(screen.getByText(/Выйти/i)).toBeInTheDocument();
  });

  test.skip('should change language', async () => {
    authSpy.mockReturnValue([
      {} as unknown as User,
      false,
      {} as unknown as Error,
    ]);
    renderWithProviders(
      <MemoryRouter>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </MemoryRouter>,
    );

    const selectButton = screen.getByRole('combobox');

    expect(selectButton).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

    userEvent.click(selectButton);
    const optionButton = await screen.findByText(/Русский/i);
    await act(async () => {
      userEvent.click(optionButton);
    });

    expect(await screen.findByText(/Русский/i)).toBeInTheDocument();
    expect(await screen.findByText(/Домой/i)).toBeInTheDocument();
    expect(await screen.findByText(/Выйти/i)).toBeInTheDocument();
  });
});
