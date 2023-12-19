import { createContext, useMemo, useState } from 'react';
import translate from '@/translations/translate';
import { LanguageContextProps } from './LanguageContext.types';

export const LanguageContext = createContext<LanguageContextProps | null>(null);

export function LanguageProvider({ children }: { children: JSX.Element }) {
  const [lang, setLang] = useState('en');

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
