import * as translationsModule from '@/translations';
import { Translations } from './types';

const translations: Translations = translationsModule;

export default function translate(
  lang: string,
  text: string,
  plural?: number,
): string {
  let result =
    translations[lang] && text in translations[lang]
      ? translations[lang][text]
      : text;

  if (typeof plural !== 'undefined') {
    const key = new Intl.PluralRules(lang).select(plural);

    if (typeof key === 'string' && typeof result === 'object') {
      result = result[key];
    }
  }

  return result;
}
