import { api } from '@/api/api';
import { IGetGraphQLRequest } from '@/api/graphApi/graphApi.types';

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
    }),
  }),
});

export const { useGetGraphQLRequestMutation } = graphApi;
