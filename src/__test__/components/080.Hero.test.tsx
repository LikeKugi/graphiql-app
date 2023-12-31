import { afterEach, describe, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Hero from '@/components/Hero/Hero';

describe('Hero component tests', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render component', function () {
    render(<Hero src="test_src" alt="alt" text="test_text" direction="row" />);
    expect(screen.queryByText(/test_text/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt');
    expect(screen.getByRole('img').getAttribute('alt')).toBe('alt');
  });
});
