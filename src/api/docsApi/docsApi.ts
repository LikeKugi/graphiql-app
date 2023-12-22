import { ITypeQuery } from '@/types';
import { api } from '../api';
import { introspectionQuery } from '@/constants/introspectionQuery';
import {
  IBaseRequest,
  IDocsResp,
  IGetTypeRequest,
  ITypeResp,
} from './docsApi.types';

export const docsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDocs: build.query<ITypeQuery[], IBaseRequest>({
      query({ url, headers }) {
        return {
          url,
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: introspectionQuery }),
        };
      },
      transformResponse: (resp) =>
        (resp as IDocsResp).data.__schema.types.filter(
          (type) => !type.name.includes('__'),
        ),
    }),

    getType: build.query<ITypeResp, IGetTypeRequest>({
      query({ url, type, headers }) {
        const typeQuery = `{
          __type(name: "${type}") {
            name
            description
            fields {
              name
              description
              type {
                name
                description
              }
              args {
                name
                description
                type {
                  name
                  description
                }
              }
            }
          }
        }`;
        const body = JSON.stringify({ query: typeQuery });
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

export const { useLazyGetDocsQuery, useLazyGetTypeQuery, useGetDocsQuery } =
  docsApi;
