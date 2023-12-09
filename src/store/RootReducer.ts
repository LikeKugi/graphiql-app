import { combineReducers } from '@reduxjs/toolkit';
import { api, ApiReducer } from '@/api/api';
import lang from './reducers/langSlice';

export const RootReducer = combineReducers({
  lang,
  [ApiReducer]: api.reducer,
});
