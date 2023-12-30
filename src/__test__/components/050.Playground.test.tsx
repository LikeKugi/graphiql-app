import { cleanup, fireEvent, screen } from '@testing-library/react';
import createFetchMock from 'vitest-fetch-mock';
import { renderWithProviders } from '../redux/renderWithProviders';
import { LanguageProvider } from '@/contexts/LanguageContext/LanguageContext';
import PlayGround from '@/components/PlayGround/PlayGround';
import { store } from '@/store';

interface IMockCodeMirror {
  value: string;
  onChange: (val: string) => void;
}

vi.mock('@uiw/react-codemirror', () => {
  const mockCodeMirror = ({ value, onChange, ...rest }: IMockCodeMirror) => {
    return (
      <textarea
        {...rest}
        data-testid="mock-codemirror"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };
  return { default: mockCodeMirror };
});

describe('test Playgrond component', () => {
  const fetchData = createFetchMock(vi);
  fetchData.enableMocks();

  beforeEach(() => {
    fetchData.doMock();
  });

  afterEach(() => {
    cleanup();
  });

  test('should render with correct default data and change tabs', () => {
    renderWithProviders(
      <LanguageProvider>
        <PlayGround
          graphRequest="test: testGrapgQL"
          headersRequest="test: testHeaders"
          variablesRequest="test: testVariables"
          jsonResponse="test: testResponse"
          setGraphRequest={vi.fn()}
          setHeadersRequest={vi.fn()}
          setVariablesRequest={vi.fn()}
          saveHeadersRequest={vi.fn()}
        />
      </LanguageProvider>,
    );

    const codeMirrors0 = screen.getAllByTestId(
      'mock-codemirror',
    ) as HTMLTextAreaElement[];
    expect(codeMirrors0[0].value).toBe('test: testGrapgQL');
    expect(codeMirrors0[1].value).toBe('test: testVariables');
    expect(codeMirrors0[2].value).toBe('test: testResponse');

    const headerTabs = screen.getByText('Headers');
    fireEvent.click(headerTabs);

    const codeMirrors1 = screen.getAllByTestId(
      'mock-codemirror',
    ) as HTMLTextAreaElement[];
    expect(codeMirrors1[0].value).toBe('test: testGrapgQL');
    expect(codeMirrors1[1].value).toBe('test: testHeaders');
    expect(codeMirrors1[2].value).toBe('test: testResponse');

    const resizers = screen.getAllByTestId('PlaygroundResizer');
    expect(resizers).toHaveLength(2);
  });

  test('should render docs section', async () => {
    const initialState = store.getState();
    fetchData.mockAbortOnce();

    renderWithProviders(
      <LanguageProvider>
        <PlayGround
          graphRequest=""
          headersRequest=""
          variablesRequest=""
          jsonResponse=""
          setGraphRequest={vi.fn()}
          setHeadersRequest={vi.fn()}
          setVariablesRequest={vi.fn()}
          saveHeadersRequest={vi.fn()}
        />
      </LanguageProvider>,
      { preloadedState: { ...initialState, docs: { isDocsShown: true } } },
    );

    const resizers = screen.getAllByTestId('PlaygroundResizer');
    expect(resizers).toHaveLength(3);
    expect(await screen.findByTestId('docs')).toBeInTheDocument();
  });

  test('should set values onChange codeMirrors', () => {
    const setGraphRequestMock = vi.fn();
    const setVariablesRequest = vi.fn();
    const setHeadersRequestMock = vi.fn();
    const saveHeadersRequestMock = vi.fn();

    renderWithProviders(
      <LanguageProvider>
        <PlayGround
          graphRequest=""
          headersRequest=""
          variablesRequest=""
          jsonResponse=""
          setGraphRequest={setGraphRequestMock}
          setHeadersRequest={setHeadersRequestMock}
          setVariablesRequest={setVariablesRequest}
          saveHeadersRequest={saveHeadersRequestMock}
        />
      </LanguageProvider>,
    );

    const codeMirrors0 = screen.getAllByTestId(
      'mock-codemirror',
    ) as HTMLTextAreaElement[];
    const graphCodeMirror = codeMirrors0[0];
    const varCodeMirror = codeMirrors0[1];

    fireEvent.change(graphCodeMirror, { target: { value: 'test-graphQL' } });
    fireEvent.change(varCodeMirror, { target: { value: 'test-variables' } });

    expect(setGraphRequestMock).toHaveBeenCalledWith('test-graphQL');
    expect(setVariablesRequest).toHaveBeenCalledWith('test-variables');

    const headerTabs = screen.getByText('Headers');
    fireEvent.click(headerTabs);

    const codeMirrors1 = screen.getAllByTestId(
      'mock-codemirror',
    ) as HTMLTextAreaElement[];
    const headersCodeMirror = codeMirrors1[1];

    fireEvent.change(headersCodeMirror, { target: { value: 'test-headers' } });
    expect(setHeadersRequestMock).toHaveBeenCalledWith('test-headers');
    fireEvent.blur(headersCodeMirror);
    expect(saveHeadersRequestMock).toHaveBeenCalled();
  });
});
