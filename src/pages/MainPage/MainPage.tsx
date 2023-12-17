import { JSX, useEffect, useState } from 'react';
import PlayGround from '@/components/PlayGround/PlayGround';
import PlayGroundActions from '@/components/PlayGroundActions/PlayGroundActions';
import { prettifyJSON, prettifyJSONObject } from '@/utils/prettifyJSON';
import { useAppDispatch } from '@/store';
import { setAddress } from '@/store/reducers/addressSlice';

const MainPage = (): JSX.Element => {
  const [graphRequest, setGraphRequest] = useState('');
  const [variablesRequest, setVariablesRequest] = useState('');
  const [headersRequest, setHeadersRequest] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');
  const [urlAddress, setUrlAddress] = useState(
    'https://rickandmortyapi.com/graphql',
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setAddress(urlAddress));
  }, [urlAddress, dispatch]);

  const handleSubmit = async () => {
    if (!graphRequest) {
      return;
    }
    setJsonResponse('');
    const address = urlAddress || 'https://rickandmortyapi.com/graphql';
    const bodyObject: { query: string; variables?: object } = {
      query: graphRequest,
    };
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

    const response = await fetch(address, {
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
