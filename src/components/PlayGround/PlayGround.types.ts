import { Dispatch, SetStateAction } from 'react';

export interface IPlayGroundProps {
  graphRequest: string;
  headersRequest: string;
  variablesRequest: string;
  jsonResponse: string;
  setGraphRequest: Dispatch<SetStateAction<string>>;
  setHeadersRequest: Dispatch<SetStateAction<string>>;
  setVariablesRequest: Dispatch<SetStateAction<string>>;
}
