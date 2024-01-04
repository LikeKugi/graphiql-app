import { cleanup, fireEvent, screen } from '@testing-library/react';
import createFetchMock from 'vitest-fetch-mock';
import { renderWithProviders } from '../redux/renderWithProviders';
import Docs from '@/components/Docs/Docs';
import { LanguageProvider } from '@/contexts/LanguageContext';

const type1 = {
  name: 'test name 1',
  description: 'test description 1',
  fields: [
    {
      name: 'test name field',
      description: 'test description field',
      type: {
        name: 'test type field name',
      },
    },
  ],
};
const type2 = {
  name: 'test name 2',
  description: 'test description 2',
  fields: [],
};
const type3 = {
  name: '__test name 3',
  description: 'test description 3',
  fields: [],
};

const docsSuccessResp = {
  data: { __schema: { types: [type1, type2, type3] } },
};

const typeSuccessResp1 = {
  data: {
    __type: type1,
  },
};

const typeSuccessResp2 = {
  data: {
    __type: type2,
  },
};

describe('test Docs component', () => {
  const fetchData = createFetchMock(vi);
  fetchData.enableMocks();

  beforeEach(() => {
    fetchData.doMock();
  });

  afterEach(() => {
    cleanup();
  });

  test('should render correct data with successfull response', async () => {
    fetchData.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(docsSuccessResp)), 100),
        ),
    );

    renderWithProviders(
      <LanguageProvider>
        <Docs />
      </LanguageProvider>,
    );
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(
      screen.getByText(
        'A GraphQL schema provides a root type for each kind of operation.',
      ),
    ).toBeInTheDocument();
    expect(await screen.findByText('test name 1')).toBeInTheDocument();
    expect(screen.getByText('test name 2')).toBeInTheDocument();
    expect(screen.queryByText('__test name 3')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  test('should render correct error message', async () => {
    fetchData.mockAbortOnce();

    renderWithProviders(
      <LanguageProvider>
        <Docs />
      </LanguageProvider>,
    );

    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(
      await screen.findByText('Oops, something went wrong. Failed to fetch.'),
    ).toBeInTheDocument();
  });

  test('should call additional request after name click, render correct data and render prev type after "back" button click', async () => {
    fetchData.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(docsSuccessResp)), 100),
        ),
    );

    renderWithProviders(
      <LanguageProvider>
        <Docs />
      </LanguageProvider>,
    );

    const name1 = await screen.findByText('test name 1');
    fetchData.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(typeSuccessResp1)), 100),
        ),
    );
    fireEvent.click(name1);

    const fieldTypeName = await screen.findByText('test type field name');
    const button = await screen.findByRole('button');
    expect(await screen.findByText('test name 1')).toBeInTheDocument();
    expect(await screen.findByText('test description 1')).toBeInTheDocument();
    expect(await screen.findByText('Fields')).toBeInTheDocument();
    expect(await screen.findByText('test name field:')).toBeInTheDocument();
    expect(
      await screen.findByText('test description field'),
    ).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Docs');
    expect(fieldTypeName).toBeInTheDocument();

    fetchData.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(typeSuccessResp2)), 100),
        ),
    );
    fireEvent.click(fieldTypeName);

    expect(await screen.findByText('test name 2')).toBeInTheDocument();
    expect(await screen.findByText('test description 2')).toBeInTheDocument();
    const buttonBack = screen.getByRole('button');
    expect(buttonBack).toBeInTheDocument();
    expect(buttonBack).toHaveTextContent('test name 1');

    fireEvent.click(buttonBack);

    expect(screen.getByText('test name 1')).toBeInTheDocument();
    expect(screen.getByText('test description 1')).toBeInTheDocument();
    expect(screen.getByText('Fields')).toBeInTheDocument();
    expect(screen.getByText('test name field:')).toBeInTheDocument();
    expect(screen.getByText('test description field')).toBeInTheDocument();
    const prevButtonBack = screen.getByRole('button');
    expect(prevButtonBack).toBeInTheDocument();
    expect(prevButtonBack).toHaveTextContent('Docs');
    expect(screen.getByText('test type field name')).toBeInTheDocument();
  });
});
