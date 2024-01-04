export interface IArgQuery {
  name: string;
  description: string;
}

export interface IFieldTypeQuery {
  name: string;
}

export interface IFieldQuery {
  name: string;
  description: string;
  args: IArgQuery;
  type: IFieldTypeQuery;
}

export interface ITypeQuery {
  description: string;
  name: string;
  fields: IFieldQuery[] | null;
}
