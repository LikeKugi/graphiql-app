import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const api = createApi({
  baseQuery: fetchBaseQuery(),
  reducerPath: 'api',
  tagTypes: [],
  endpoints: () => ({}),
});

export const ApiReducer = api.reducerPath;
