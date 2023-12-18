import { ITypeQuery } from '@/components/Docs/interfaces';

export interface IDocsResp {
  data: {
    __schema: {
      types: ITypeQuery[];
    };
  };
}

export interface ITypeResp {
  data: {
    __type: ITypeQuery;
  };
}
