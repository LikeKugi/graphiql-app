import { ITypeQuery } from '@/types';

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

export interface IBaseRequest {
  url: string;
  headers: object;
}

export interface IGetTypeRequest extends IBaseRequest {
  type: string;
}
