import { createContext, useContext, useMemo, useState } from 'react';
import translate from '@/translations/translate';
import { LanguageContextProps } from './interfaces';

export const LanguageContext = createContext<LanguageContextProps | null>(null);

export function LanguageProvider({ children }: { children: JSX.Element }) {
  const [lang, setLang] = useState('ru');

  const translations = useMemo(
    () => ({
      lang,
      setLang,
      t: (text: string, number?: number) => translate(lang, text, number),
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={translations}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
