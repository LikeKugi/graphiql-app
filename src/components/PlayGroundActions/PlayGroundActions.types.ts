import { Dispatch, SetStateAction } from 'react';

export interface IPlayGroundActionsProps {
  handleSubmit: () => void;
  handlePrettify: () => void;
  urlAddress: string;
  setUrlAddress: Dispatch<SetStateAction<string>>;
}
