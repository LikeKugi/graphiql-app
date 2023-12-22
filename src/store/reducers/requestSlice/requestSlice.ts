import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRequestSlice } from './requestSlice.types';
import { RootState } from '@/store';
import { initialGraphQL } from '@/store/reducers/requestSlice/requestSlice.constants';

const initialState: IRequestSlice = {
  graphql: initialGraphQL,
  headers: '',
  variables: '',
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setGraphQL: (state, action: PayloadAction<string>) => {
      state.graphql = action.payload;
    },
    setHeaders: (state, action: PayloadAction<string>) => {
      state.headers = action.payload;
    },
    setVariables: (state, action: PayloadAction<string>) => {
      state.headers = action.payload;
    },
  },
});

export const selectGraphQL = (state: RootState) => state.request.graphql;
export const selectHeaders = (state: RootState) => state.request.headers;
export const selectVariables = (state: RootState) => state.request.variables;
export const RequestReducer = requestSlice.reducer;
export const { setGraphQL, setHeaders, setVariables } = requestSlice.actions;
