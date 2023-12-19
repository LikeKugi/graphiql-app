import React, { FC, JSX, lazy, Suspense, useId, useState } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import styles from './PlayGround.module.scss';
import { Stack, Tab, Tabs } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { graphql } from 'cm6-graphql';
import { EditorView } from '@codemirror/view';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import PlayGroundResizer from '@/components/PlayGroundResizer/PlayGroundResizer';
import { IPlayGroundProps } from './PlayGround.types';
import { useAppSelector } from '@/store';
import { selectIsDocsShown } from '@/store/reducers/docsSlice';
import { useLanguage } from '@/contexts/LanguageContext';

const Docs = lazy(() => import('@/components/Docs/Docs'));

const PlayGround: FC<IPlayGroundProps> = ({
  headersRequest,
  setHeadersRequest,
  variablesRequest,
  setVariablesRequest,
  graphRequest,
  setGraphRequest,
  jsonResponse,
  saveHeadersRequest,
}): JSX.Element => {
  const isDocsShown = useAppSelector(selectIsDocsShown);
  const [currentTab, setCurrentTab] = useState(0);
  const { t } = useLanguage();

  const panelId = useId();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setCurrentTab(newValue);
  };

  return (
    <>
      <PanelGroup direction={'horizontal'} className={styles.PlayGround}>
        {isDocsShown && (
          <>
            <Panel
              order={1}
              id={`${panelId}_1`}
              minSize={5}
              collapsible
              className={styles.PlayGround__panel}
            >
              <Suspense fallback={''}>
                <Docs />
              </Suspense>
            </Panel>
            <PlayGroundResizer
              label={<SwapHorizIcon fontSize="small" />}
              orientation="vertical"
            />
          </>
        )}
        <Panel
          id={`${panelId}_2`}
          order={2}
          className={styles.PlayGround__panel}
          minSize={5}
          collapsible
        >
          <PanelGroup direction={'vertical'}>
            <Panel
              order={3}
              id={`${panelId}_2.1`}
              className={styles.PlayGround__panel}
              minSize={5}
              collapsible
            >
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
              <Tab label={t('playground.variables')} />
              <Tab label={t('playground.headers')} />
            </Tabs>
            <Panel
              id={`${panelId}_2.2`}
              order={4}
              className={styles.PlayGround__panel}
              minSize={10}
              collapsible
            >
              {currentTab === 0 && (
                <Stack p={1} flexGrow={1}>
                  <CodeMirror
                    className={styles.PlayGround__CodeMirror}
                    value={variablesRequest}
                    height="100%"
                    onChange={(value) => {
                      setVariablesRequest(value);
                    }}
                    extensions={[langs.json(), EditorView.lineWrapping]}
                  />
                </Stack>
              )}
              {currentTab === 1 && (
                <Stack p={0.5} flexGrow={1}>
                  <CodeMirror
                    className={styles.PlayGround__CodeMirror}
                    value={headersRequest}
                    height="100%"
                    onChange={(value) => {
                      setHeadersRequest(value);
                    }}
                    onBlur={saveHeadersRequest}
                    extensions={[langs.json(), EditorView.lineWrapping]}
                  />
                </Stack>
              )}
            </Panel>
          </PanelGroup>
        </Panel>
        <PlayGroundResizer
          label={<SwapHorizIcon fontSize="small" />}
          orientation="vertical"
        />
        <Panel
          id={`${panelId}_3`}
          order={5}
          minSize={5}
          collapsible
          className={styles.PlayGround__panel}
        >
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
