import { api } from '@/api/api';
import { IGetGraphQLRequest } from '@/api/graphApi/graphApi.types';
import {
  setErrorMessage,
  setSuccessMessage,
} from '@/store/reducers/toastSlice';
import { IApiError } from '../api.types';

export const graphApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGraphQLRequest: build.mutation<unknown, IGetGraphQLRequest>({
      query({ url, headers, body }) {
        return {
          url,
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setErrorMessage(''));
        dispatch(setSuccessMessage(''));
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage('The request was successful'));
        } catch (e) {
          dispatch(setErrorMessage((e as IApiError).error.error));
        }
      },
    }),
  }),
});

export const { useGetGraphQLRequestMutation } = graphApi;
