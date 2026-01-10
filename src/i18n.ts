import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './assets/locales/en.json';

void i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translation: translationEn,
    },
  },
});

export { i18n };
