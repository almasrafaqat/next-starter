import { locales, defaultLocale } from './routing';

export function detectBrowserLanguage() {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    return locales.includes(browserLang) ? browserLang : defaultLocale;
  }
  return defaultLocale; // Default to the default locale for server-side rendering
}

