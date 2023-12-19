import { JSX, useState } from 'react';
import PlayGround from '@/components/PlayGround/PlayGround';
import PlayGroundActions from '@/components/PlayGroundActions/PlayGroundActions';
import { prettifyJSON, prettifyJSONObject } from '@/utils/prettifyJSON';
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

const MainPage = (): JSX.Element => {
  const { url: initialURL } = useAppSelector(selectAddress);
  const initialGraphQL = useAppSelector(selectGraphQL);
  const initialVariables = useAppSelector(selectVariables);
  const initialHeaders = useAppSelector(selectHeaders);

  const [graphRequest, setGraphRequest] = useState(initialGraphQL);
  const [variablesRequest, setVariablesRequest] = useState(initialVariables);
  const [headersRequest, setHeadersRequest] = useState(initialHeaders);
  const [jsonResponse, setJsonResponse] = useState('');
  const [urlAddress, setUrlAddress] = useState(initialURL);

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    dispatch(setGraphQL(graphRequest));
    dispatch(setHeaders(headersRequest));
    dispatch(setVariables(variablesRequest));
    dispatch(setAddress(urlAddress));
    setJsonResponse('');
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

    const response = await fetch(urlAddress, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await response.json();
    setJsonResponse(prettifyJSONObject(data));
  };

  const handlePrettify = () => {
    if (variablesRequest) {
      setVariablesRequest(prettifyJSON(variablesRequest));
    }
    if (headersRequest) {
      setHeadersRequest(prettifyJSON(headersRequest));
    }
    if (jsonResponse) {
      setJsonResponse(prettifyJSON(jsonResponse));
    }
  };

  return (
    <div>
      <PlayGroundActions
        handleSubmit={handleSubmit}
        handlePrettify={handlePrettify}
        urlAddress={urlAddress}
        setUrlAddress={setUrlAddress}
      />
      <PlayGround
        headersRequest={headersRequest}
        graphRequest={graphRequest}
        variablesRequest={variablesRequest}
        jsonResponse={jsonResponse}
        setGraphRequest={setGraphRequest}
        setHeadersRequest={setHeadersRequest}
        setVariablesRequest={setVariablesRequest}
      />
    </div>
  );
};
export default MainPage;
