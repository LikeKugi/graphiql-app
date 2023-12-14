import { JSX, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import styles from './PlayGround.module.scss';
import { Box, Chip, Divider, Tab, Tabs } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { graphql } from 'cm6-graphql';
import { EditorView } from '@codemirror/view';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';

const PlayGround = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0);
  const [graphRequest, setGraphRequest] = useState('');
  const [variablesRequest, setVariablesRequest] = useState('');
  const [headersRequest, setHeadersRequest] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setCurrentTab(newValue);
  };

  const handleSubmit = async () => {
    setJsonResponse('');
    const address = 'https://rickandmortyapi.com/graphql';
    const body = JSON.stringify({
      query: graphRequest,
      variables: JSON.parse(variablesRequest),
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
    setJsonResponse(JSON.stringify(data, null, 2));
  };
  return (
    <>
      <button onClick={handleSubmit}>Go</button>
      <PanelGroup direction={'horizontal'} className={styles.PlayGround}>
        <Panel className={styles.PlayGround__panel} minSize={5} collapsible>
          <PanelGroup direction={'vertical'}>
            <Panel className={styles.PlayGround__panel} minSize={5} collapsible>
              <CodeMirror
                className={styles.PlayGround__CodeMirror}
                value={graphRequest}
                height="100%"
                onChange={(value) => {
                  setGraphRequest(value);
                }}
                extensions={[graphql(), EditorView.lineWrapping]}
              />
            </Panel>
            <PanelResizeHandle>
              <Divider>
                <Chip
                  label={<SwapVertIcon fontSize="small" />}
                  variant="outlined"
                />
              </Divider>
            </PanelResizeHandle>
            <Tabs value={currentTab} onChange={handleChange}>
              <Tab label={'Headers'} />
              <Tab label={'Variables'} />
            </Tabs>
            <Panel
              className={styles.PlayGround__panel}
              minSize={10}
              collapsible
            >
              <Box hidden={currentTab !== 0} p={0.5} flexGrow={1}>
                <CodeMirror
                  className={styles.PlayGround__CodeMirror}
                  value={headersRequest}
                  height="100%"
                  onChange={(value) => {
                    setHeadersRequest(value);
                  }}
                  extensions={[langs.json(), EditorView.lineWrapping]}
                />
              </Box>
              <Box hidden={currentTab !== 1} p={1} flexGrow={1}>
                <CodeMirror
                  className={styles.PlayGround__CodeMirror}
                  value={variablesRequest}
                  height="100%"
                  onChange={(value) => {
                    setVariablesRequest(value);
                  }}
                  extensions={[langs.json(), EditorView.lineWrapping]}
                />
              </Box>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle>
          <Divider orientation={'vertical'}>
            <Chip
              label={<SwapHorizIcon fontSize="small" />}
              variant="outlined"
            />
          </Divider>
        </PanelResizeHandle>
        <Panel minSize={5} collapsible className={styles.PlayGround__panel}>
          <CodeMirror
            className={styles.PlayGround__CodeMirror}
            value={jsonResponse}
            height="100%"
            extensions={[langs.json(), EditorView.lineWrapping]}
            readOnly
          />
        </Panel>
      </PanelGroup>
    </>
  );
};
export default PlayGround;
