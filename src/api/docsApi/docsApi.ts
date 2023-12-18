import { ITypeQuery } from '@/components/Docs/interfaces';
import { api } from '../api';
import { introspectionQuery } from '@/components/Docs/introspectionQuery.constant';
import { IDocsResp, ITypeResp } from './interfaces';

export const docsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDocs: build.query<ITypeQuery[], string>({
      query(url) {
        return {
          url,
          method: 'POST',
          headers: {
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

    getType: build.query<ITypeResp, { url: string; type: string }>({
      query({ url, type }) {
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
            'Content-Type': 'application/json',
          },
          body,
        };
      },
    }),
  }),
});
