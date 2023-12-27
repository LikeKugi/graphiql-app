import { ChangeEvent } from 'react';

export interface IPlayGroundActionsProps {
  handleSubmit: () => void;
  handlePrettify: () => void;
  urlAddress: string;
  setUrlAddress: (e: ChangeEvent<HTMLInputElement>) => void;
  onDocsClick: () => void;
  saveUrlRequest: () => void;
}
