import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguegeConstant } from '@/constants/languege/languege.constant';

const initialState = {
  lang: LanguegeConstant.EN,
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<LanguegeConstant>) {
      state.lang = action.payload;
    },
  },
});

export default langSlice.reducer;
export const { setLang } = langSlice.actions;
