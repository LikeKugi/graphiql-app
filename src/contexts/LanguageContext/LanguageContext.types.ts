export interface LanguageContextProps {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  t: (text: string, number?: number) => string;
}
