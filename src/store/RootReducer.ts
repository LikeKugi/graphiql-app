import { combineReducers } from '@reduxjs/toolkit';
import { api, ApiReducer } from '@/api/api';
import lang from './reducers/langSlice';
import docs from './reducers/docsSlice';
import address from './reducers/addressSlice';

export const RootReducer = combineReducers({
  lang,
  docs,
  address,
  [ApiReducer]: api.reducer,
});
