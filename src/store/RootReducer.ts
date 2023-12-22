import { combineReducers } from '@reduxjs/toolkit';
import { api, ApiReducer } from '@/api/api';
import lang from './reducers/langSlice';
import docs from './reducers/docsSlice';
import address from './reducers/addressSlice';
import { RequestReducer } from './reducers/requestSlice';
import { ResponseReducer } from '@/store/reducers/responseSlice';

export const RootReducer = combineReducers({
  lang,
  docs,
  address,
  request: RequestReducer,
  response: ResponseReducer,
  [ApiReducer]: api.reducer,
});
