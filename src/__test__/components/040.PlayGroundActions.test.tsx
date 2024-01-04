import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import PlayGroundActions from '@/components/PlayGroundActions/PlayGroundActions';

describe('PlayGroundActions tests', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render component', function () {
    render(
      <LanguageProvider>
        <PlayGroundActions
          handleSubmit={vi.fn()}
          handlePrettify={vi.fn()}
          urlAddress="initial"
          setUrlAddress={vi.fn()}
          onDocsClick={vi.fn()}
          saveUrlRequest={vi.fn()}
        />
      </LanguageProvider>,
    );
    expect(screen.queryAllByText(/GraphQL/i)).toHaveLength(2);
    expect(screen.queryByRole('textbox')).toHaveValue('initial');
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });
  it.each([0, 1, 2])('should handle clicks on buttons', function (i) {
    const fn = vi.fn();

    render(
      <LanguageProvider>
        <PlayGroundActions
          handleSubmit={fn}
          handlePrettify={fn}
          urlAddress="initial"
          setUrlAddress={fn}
          onDocsClick={fn}
          saveUrlRequest={fn}
        />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getAllByRole('button')[i]);

    expect(fn).toHaveBeenCalled();
  });

  it('should change input disabled state', function () {
    const fn = vi.fn();
    const changer = vi.fn();
    const saver = vi.fn();
    render(
      <LanguageProvider>
        <PlayGroundActions
          handleSubmit={fn}
          handlePrettify={fn}
          urlAddress="initial"
          setUrlAddress={changer}
          onDocsClick={fn}
          saveUrlRequest={saver}
        />
      </LanguageProvider>,
    );

    const urltextbox: HTMLInputElement = screen.getByRole('textbox');
    const urlButton = screen.getAllByRole('button')[3];
    expect(urltextbox).toBeDisabled();
    fireEvent.click(urlButton);
    expect(urltextbox).not.toBeDisabled();
    fireEvent.change(urltextbox, { target: { value: 'kek' } });
    expect(changer).toHaveBeenCalled();
    fireEvent.click(urlButton);
    expect(urltextbox).toBeDisabled();
    expect(saver).toHaveBeenCalled();
  });
});
