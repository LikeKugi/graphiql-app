import { FC, JSX, ReactNode } from 'react';
import { Chip, Divider } from '@mui/material';
import { PanelResizeHandle } from 'react-resizable-panels';

interface IPlayGroundResizerProps {
  orientation?: 'vertical' | 'horizontal';
  label: ReactNode;
}

const PlayGroundResizer: FC<IPlayGroundResizerProps> = ({
  orientation,
  label,
}): JSX.Element => {
  return (
    <PanelResizeHandle>
      <Divider orientation={orientation}>
        <Chip label={label} variant="outlined" />
      </Divider>
    </PanelResizeHandle>
  );
};
export default PlayGroundResizer;
