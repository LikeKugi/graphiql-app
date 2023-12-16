import { combineReducers } from '@reduxjs/toolkit';
import { api, ApiReducer } from '@/api/api';
import lang from './reducers/langSlice';
import docs from './reducers/docsSlice';

export const RootReducer = combineReducers({
  lang,
  docs,
  [ApiReducer]: api.reducer,
});
