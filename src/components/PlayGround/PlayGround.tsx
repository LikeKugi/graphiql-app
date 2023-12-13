import { JSX } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import styles from './PlayGround.module.scss';

const PlayGround = (): JSX.Element => {
  return (
    <>
      <PanelGroup direction={'horizontal'} className={styles.PlayGround}>
        <Panel className={styles.PlayGround__panel} minSize={5} collapsible>
          <PanelGroup direction={'vertical'}>
            <Panel className={styles.PlayGround__panel} minSize={5} collapsible>
              codemirror
            </Panel>
            <PanelResizeHandle>{'^'}</PanelResizeHandle>
            <div>
              <button>Variables</button>
              <button>Headers</button>
            </div>
            <Panel
              className={styles.PlayGround__panel}
              minSize={10}
              collapsible
            >
              codemirror
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle>{'<|>'}</PanelResizeHandle>
        <button>1</button>
        <Panel minSize={5} collapsible className={styles.PlayGround__panel}>
          codemirror
        </Panel>
      </PanelGroup>
    </>
  );
};
export default PlayGround;
