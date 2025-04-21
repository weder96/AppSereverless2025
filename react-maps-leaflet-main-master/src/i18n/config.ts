import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";


const defaultLng = 'en';
let lng = defaultLng;

i18n
.use(initReactI18next)
.use(HttpApi)
  .init({
    lng,
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/translations/{{lng}}.json',
      allowMultiLoading: true
    },
    react: {
      wait: true,
      useSuspense: false
    }
  });

export default i18n;
