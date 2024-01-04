import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { graphApi } from '@/api/graphApi/graphApi';
import { RootState } from '@/store';

const initialState = {
  json: '',
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setJson: (state, action: PayloadAction<string>) => {
      state.json = action.payload;
    },
    clearJson: (state) => {
      state.json = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      graphApi.endpoints.getGraphQLRequest.matchPending,
      (state) => {
        state.json = '';
      },
    );
    builder.addMatcher(
      graphApi.endpoints.getGraphQLRequest.matchFulfilled,
      (state, action) => {
        state.json = JSON.stringify(action.payload);
      },
    );
  },
});

export const selectJSON = (state: RootState) => state.response.json;
export const ResponseReducer = responseSlice.reducer;
export const { setJson, clearJson } = responseSlice.actions;
