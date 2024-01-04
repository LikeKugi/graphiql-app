import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';

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

export const selectIsDocsShown = (state: RootState) => state.docs.isDocsShown;
export default docsSlice.reducer;
export const { setIsDocsShown } = docsSlice.actions;
