import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // load translation using http -> see /public/locales (i.e. https://site.com/locales/fr/ns.json)
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    lng: 'fr', // Force French by default
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    ns: ['common', 'auth', 'navigation', 'dashboard', 'projects', 'education', 'experience', 'skills', 'blog', 'home', 'contact'],
    defaultNS: 'common',
    debug: false, 

    interpolation: {
      escapeValue: false, 
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'portfolio_lang',
      caches: ['localStorage'],
    }
  });

export default i18n;