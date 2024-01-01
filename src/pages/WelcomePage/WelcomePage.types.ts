export interface IBaseData {
  src: string;
  alt: string;
}

export interface IHeroData extends IBaseData {
  text: string;
}

export interface IDeveloperData extends IBaseData {
  name: string;
  href: string;
  hrefDescription: string;
  workDescription: string;
}
