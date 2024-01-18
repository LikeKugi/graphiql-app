import Fallback from '@/components/ErrorBoundaryFallback/Fallback';
import { renderWithProviders } from '../redux/renderWithProviders';
import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RouterConstants } from '@/constants/routes';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn().mockReturnValue({
      name: 'test name',
      message: 'test message',
      stack: 'test stack',
    }),
  };
});

describe('test Fallback component', () => {
  test('should render correct data with error-boundary message', () => {
    const error = {
      name: 'test name',
      message: 'test message',
      stack: 'test stack',
    };

    renderWithProviders(
      <Fallback error={error} resetErrorBoundary={vi.fn()} />,
    );

    expect(screen.getByText('An error occurred!')).toBeInTheDocument();
    expect(screen.getByText('test name: test message')).toBeInTheDocument();
    expect(screen.getByText('test stack')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(
      screen.queryByText('An error occurred on the route test route'),
    ).toBeNull();
  });

  test('should render correct data with route message', () => {
    renderWithProviders(
      <MemoryRouter>
        <Fallback routeMessage="test route" />
      </MemoryRouter>,
    );

    expect(screen.getByText('An error occurred!')).toBeInTheDocument();
    expect(screen.getByText('test name: test message')).toBeInTheDocument();
    expect(
      screen.getByText('An error occurred on the route test route'),
    ).toBeInTheDocument();
    expect(screen.getByText('test stack')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('should call reset func', () => {
    const error = {
      name: 'test name',
      message: 'test message',
      stack: 'test stack',
    };

    const resetMock = vi.fn();

    renderWithProviders(
      <Fallback error={error} resetErrorBoundary={resetMock} />,
    );

    const reset = screen.getByText('Reset');
    fireEvent.click(reset);
    expect(resetMock).toHaveBeenCalled();
    expect(reset instanceof HTMLAnchorElement).not.toBe(RouterConstants.INDEX);
  });

  test('should contain link to home', () => {
    renderWithProviders(
      <MemoryRouter>
        <Fallback routeMessage="test route" />
      </MemoryRouter>,
    );
    const reset = screen.getByText('Reset');
    expect(reset instanceof HTMLAnchorElement).toBe(true);
  });
});
