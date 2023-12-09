import { describe, expect, test } from 'vitest';
import { act, screen } from '@testing-library/react';
import { renderWithProviders } from '../redux/renderWithProviders';
import Header from '@/components/Header/Header';
import { languageConstant } from '@/constants/language/language.constant';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('test Header component', () => {
  test('should render correct data with english', () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: { lang: { lang: languageConstant.EN } },
      },
    );

    expect(screen.getAllByText(/language/i)).toHaveLength(2);
    expect(screen.getByText(/English/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  test('should render correct data with russian', () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: { lang: { lang: languageConstant.RU } },
      },
    );

    expect(screen.getAllByText(/Язык/i)).toHaveLength(1);
    expect(screen.getByText(/Русский/i)).toBeInTheDocument();
    expect(screen.getByText(/Домой/i)).toBeInTheDocument();
    expect(screen.getByText(/Выйти/i)).toBeInTheDocument();
  });

  test('should change language', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: { lang: { lang: languageConstant.EN } },
      },
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
