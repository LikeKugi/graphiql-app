import { FC, JSX } from 'react';
import { Chip, Divider } from '@mui/material';
import { PanelResizeHandle } from 'react-resizable-panels';
import { IPlayGroundResizerProps } from './PlayGroundResizer.types';

const PlayGroundResizer: FC<IPlayGroundResizerProps> = ({
  orientation,
  label,
}): JSX.Element => {
  return (
    <PanelResizeHandle>
      <Divider orientation={orientation}>
        <Chip
          label={label}
          variant="outlined"
          sx={{
            '& .MuiChip-label': {
              display: 'flex',
            },
          }}
        />
      </Divider>
    </PanelResizeHandle>
  );
};
export default PlayGroundResizer;
