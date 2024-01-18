import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer/Footer';

describe('test Footer component', () => {
  test('should render correct data', () => {
    render(<Footer />);

    expect(screen.getByText(/2023/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });
});
