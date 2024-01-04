import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import PlayGroundResizer from '@/components/PlayGroundResizer/PlayGroundResizer';
import { PanelGroup } from 'react-resizable-panels';

type TOrientation = 'vertical' | 'horizontal' | undefined;
const label = 'resizer';
describe('test PlayGroundResizer component', () => {
  afterEach(() => {
    cleanup();
  });

  it.each([undefined, 'vertical', 'horizontal'])(
    'should render component',
    function (orientation) {
      render(
        <PanelGroup direction={'horizontal'}>
          <PlayGroundResizer
            label={label}
            orientation={orientation as TOrientation}
          />
        </PanelGroup>,
      );
      expect(screen.queryByText(label)).toBeInTheDocument();
    },
  );
});
