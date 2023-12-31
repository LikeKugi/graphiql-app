import { afterEach, describe, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import DeveloperCard from '@/components/DeveloperCard/DeveloperCard';
import { MemoryRouter } from 'react-router-dom';

describe('DeveloperCard tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    render(
      <MemoryRouter initialEntries={['/']}>
        <DeveloperCard
          src="src"
          alt="alt"
          name="name"
          href="href"
          hrefDescription="description"
          workDescription="work"
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('alt')).toBe('alt');
    expect(screen.queryByText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.queryByText(/description/i)).toBeInTheDocument();
    expect(screen.queryByText(/work/i)).toBeInTheDocument();
  });
});
