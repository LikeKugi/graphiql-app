import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery(),
  reducerPath: 'api',
  tagTypes: [],
  endpoints: () => ({}),
});

export const ApiReducer = api.reducerPath;
