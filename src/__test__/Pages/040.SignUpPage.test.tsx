import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../redux/renderWithProviders';
import { LanguageProvider } from '@/contexts/LanguageContext';
import SignUpPage from '@/pages/SignUpPage/SignUpPage';
import { screen } from '@testing-library/react';

describe('test SignUpPage component', () => {
  test('should render correct data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <LanguageProvider>
          <SignUpPage />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(await screen.findAllByText(/First name/i)).toHaveLength(2);
    expect(await screen.findAllByText(/Last name/i)).toHaveLength(2);
    expect(await screen.findAllByText(/Email address/i)).toHaveLength(2);
    expect(await screen.findAllByText(/Password/i)).toHaveLength(3);

    const heading = await screen.findByRole('heading');
    expect(heading).toHaveTextContent('Sign Up');

    const button = await screen.findByRole('button');
    expect(button).toHaveTextContent('Sign Up');

    expect(
      await screen.findByText('Already have an account?'),
    ).toBeInTheDocument();
    expect(await screen.findByText('Sign In')).toBeInTheDocument();
  });
});
