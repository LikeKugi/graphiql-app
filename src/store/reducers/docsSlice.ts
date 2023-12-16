import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDocsShown: false,
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setIsDocsShown: (state, action: PayloadAction<boolean>) => {
      state.isDocsShown = action.payload;
    },
  },
});

export default docsSlice.reducer;
export const { setIsDocsShown } = docsSlice.actions;
