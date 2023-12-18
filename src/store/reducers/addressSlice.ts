import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  url: 'https://rickandmortyapi.com/graphql',
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
  },
});

export default addressSlice.reducer;
export const { setAddress } = addressSlice.actions;
