import { Dispatch, FC, JSX, SetStateAction, useState } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import styles from './PlayGround.module.scss';
import { Box, Tab, Tabs } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { graphql } from 'cm6-graphql';
import { EditorView } from '@codemirror/view';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import PlayGroundResizer from '@/components/PlayGroundResizer/PlayGroundResizer';

interface IPlayGroundProps {
  graphRequest: string;
  headersRequest: string;
  variablesRequest: string;
  jsonResponse: string;
  setGraphRequest: Dispatch<SetStateAction<string>>;
  setHeadersRequest: Dispatch<SetStateAction<string>>;
  setVariablesRequest: Dispatch<SetStateAction<string>>;
}

const PlayGround: FC<IPlayGroundProps> = ({
  headersRequest,
  setHeadersRequest,
  variablesRequest,
  setVariablesRequest,
  graphRequest,
  setGraphRequest,
  jsonResponse,
}): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setCurrentTab(newValue);
  };

  return (
    <>
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
            <PlayGroundResizer label={<SwapVertIcon fontSize="small" />} />
            <Tabs value={currentTab} onChange={handleChange}>
              <Tab label={'Variables'} />
              <Tab label={'Headers'} />
            </Tabs>
            <Panel
              className={styles.PlayGround__panel}
              minSize={10}
              collapsible
            >
              <Box hidden={currentTab !== 0} p={1} flexGrow={1}>
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
              <Box hidden={currentTab !== 1} p={0.5} flexGrow={1}>
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
            </Panel>
          </PanelGroup>
        </Panel>
        <PlayGroundResizer
          label={<SwapHorizIcon fontSize="small" />}
          orientation="vertical"
        />
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
