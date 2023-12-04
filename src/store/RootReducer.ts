import { combineReducers } from '@reduxjs/toolkit';
import { api, ApiReducer } from '@/api/api';

export const RootReducer = combineReducers({
  [ApiReducer]: api.reducer,
});
