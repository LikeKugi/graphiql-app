import { ChangeEvent, JSX, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PlayGround from '@/components/PlayGround/PlayGround';
import PlayGroundActions from '@/components/PlayGroundActions/PlayGroundActions';
import { prettifyJSON } from '@/utils/prettifyJSON';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectAddress, setAddress } from '@/store/reducers/addressSlice';
import {
  selectGraphQL,
  selectHeaders,
  selectVariables,
  setGraphQL,
  setHeaders,
  setVariables,
} from '@/store/reducers/requestSlice';
import { useGetGraphQLRequestMutation } from '@/api/graphApi/graphApi';
import { selectJSON, setJson } from '@/store/reducers/responseSlice';
import Fallback from '@/components/ErrorBoundaryFallback/Fallback';
import { selectIsDocsShown, setIsDocsShown } from '@/store/reducers/docsSlice';
import { setSuccessMessage } from '@/store/reducers/toastSlice';
import { format } from '@/utils/prettifyGraphQL';

const MainPage = (): JSX.Element => {
  const { url: initialURL } = useAppSelector(selectAddress);
  const initialGraphQL = useAppSelector(selectGraphQL);
  const initialVariables = useAppSelector(selectVariables);
  const initialHeaders = useAppSelector(selectHeaders);
  const jsonResponse = useAppSelector(selectJSON);
  const isDocsShown = useAppSelector(selectIsDocsShown);

  const [graphRequest, setGraphRequest] = useState(initialGraphQL);
  const [variablesRequest, setVariablesRequest] = useState(initialVariables);
  const [headersRequest, setHeadersRequest] = useState(initialHeaders);
  const [urlAddress, setUrlAddress] = useState(initialURL);

  const dispatch = useAppDispatch();

  const [fetchGraphQL] = useGetGraphQLRequestMutation();

  const onDocsClick = () => {
    dispatch(setIsDocsShown(!isDocsShown));
  };

  const saveHeadersRequest = () => {
    dispatch(setHeaders(headersRequest));
  };
  const saveUrlRequest = () => {
    dispatch(setAddress(urlAddress));
    dispatch(setSuccessMessage(urlAddress));
  };
  const changeUrlAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlAddress(e.target.value);
  };

  const handleSubmit = async () => {
    saveHeadersRequest();
    dispatch(setGraphQL(graphRequest));
    dispatch(setVariables(variablesRequest));
    if (!urlAddress) return;
    const bodyObject: Record<string, string | object> = {};
    if (graphRequest) {
      bodyObject.query = graphRequest;
    }
    let variables: object | null;
    try {
      variables = JSON.parse(variablesRequest);
    } catch (e) {
      variables = null;
    }
    if (variables) {
      bodyObject.variables = variables;
    }
    const body = JSON.stringify(bodyObject)
      .replace(/\\n/g, '')
      .replace(/\s+/g, ' ');
    const headers = headersRequest ? JSON.parse(headersRequest) : '';
    fetchGraphQL({ url: urlAddress, headers, body });
  };

  const handlePrettify = () => {
    if (variablesRequest) {
      const variable = prettifyJSON(variablesRequest);
      setVariablesRequest(variable);
      dispatch(setVariables(variable));
    }
    if (headersRequest) {
      const header = prettifyJSON(headersRequest);
      setHeadersRequest(header);
      dispatch(setHeaders(header));
    }
    if (jsonResponse) {
      dispatch(setJson(prettifyJSON(jsonResponse)));
    }
    if (graphRequest) {
      setGraphRequest(format(graphRequest));
    }
  };

  return (
    <div>
      <ErrorBoundary fallbackRender={Fallback}>
        <PlayGroundActions
          handleSubmit={handleSubmit}
          handlePrettify={handlePrettify}
          urlAddress={urlAddress}
          setUrlAddress={changeUrlAddress}
          onDocsClick={onDocsClick}
          saveUrlRequest={saveUrlRequest}
        />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={Fallback}>
        <PlayGround
          headersRequest={headersRequest}
          graphRequest={graphRequest}
          variablesRequest={variablesRequest}
          jsonResponse={jsonResponse}
          setGraphRequest={setGraphRequest}
          setHeadersRequest={setHeadersRequest}
          setVariablesRequest={setVariablesRequest}
          saveHeadersRequest={saveHeadersRequest}
        />
      </ErrorBoundary>
    </div>
  );
};
export default MainPage;
