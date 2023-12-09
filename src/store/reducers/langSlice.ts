import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { languageConstant } from '@/constants/language/language.constant';

const initialState = {
  lang: languageConstant.EN,
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<languageConstant>) {
      state.lang = action.payload;
    },
  },
});

export default langSlice.reducer;
export const { setLang } = langSlice.actions;
