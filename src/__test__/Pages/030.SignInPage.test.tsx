import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../redux/renderWithProviders';
import { LanguageProvider } from '@/contexts/LanguageContext';
import SignInPage from '@/pages/SignInPage/SignInPage';
import { screen } from '@testing-library/react';

describe('test SignInPage component', () => {
  test('should render correct data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <LanguageProvider>
          <SignInPage />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(await screen.findAllByText(/Email address/i)).toHaveLength(2);
    expect(await screen.findAllByText(/Password/i)).toHaveLength(2);
    const button = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Sign In');
    expect(await screen.findByRole('textbox')).toBeInTheDocument();
    expect(
      await screen.findByText("Don't have an account?"),
    ).toBeInTheDocument();
    expect(await screen.findByText('Sign Up')).toBeInTheDocument();
    const heading = await screen.findByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Sign In');
  });
});
