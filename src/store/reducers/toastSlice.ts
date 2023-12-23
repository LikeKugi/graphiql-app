import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  errorMessage: '',
  successMessage: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
  },
});

export default errorSlice.reducer;
export const { setErrorMessage, setSuccessMessage } = errorSlice.actions;
