import { JSX, useState } from 'react';
import PlayGround from '@/components/PlayGround/PlayGround';
import PlayGroundActions from '@/components/PlayGroundActions/PlayGroundActions';
import { prettifyJSON } from '@/utils/prettifyJSON';

const MainPage = (): JSX.Element => {
  const [graphRequest, setGraphRequest] = useState('');
  const [variablesRequest, setVariablesRequest] = useState('');
  const [headersRequest, setHeadersRequest] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');
  const [urlAddress, setUrlAddress] = useState(
    'https://rickandmortyapi.com/graphql',
  );

  const handleSubmit = async () => {
    console.log('handle submit ---> start');
    if (!graphRequest) {
      return;
    }
    setJsonResponse('');
    const address = urlAddress || 'https://rickandmortyapi.com/graphql';
    let variables: object;
    try {
      variables = JSON.parse(variablesRequest);
    } catch (e) {
      variables = {};
    }
    const body = JSON.stringify({
      query: graphRequest,
      variables,
    })
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
    setJsonResponse(prettifyJSON(data));
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
