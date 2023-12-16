import { ITypeQuery } from './interfaces';
import { introspectionQuery } from './introspectionQuery';

export const getDocs = async () => {
  const address = 'https://rickandmortyapi.com/graphql';
  const body = JSON.stringify({ query: introspectionQuery });
  const response = await fetch(address, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const data = await response.json();
  const types = data?.data?.__schema?.types;
  return types.filter(
    (type: ITypeQuery) => !type.name.includes('__'),
  ) as ITypeQuery[];
};

export const getType = async (type: string) => {
  const address = 'https://rickandmortyapi.com/graphql';
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
  const response = await fetch(address, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const data = await response.json();
  return data.data.__type as ITypeQuery;
};
