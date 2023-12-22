import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { languageConstants } from '@/constants/language';

const initialState = {
  lang: languageConstants.EN,
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<languageConstants>) {
      state.lang = action.payload;
    },
  },
});

export default langSlice.reducer;
export const { setLang } = langSlice.actions;
