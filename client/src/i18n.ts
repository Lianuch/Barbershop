import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ua', 
    debug: false,
    detection: {
      order: ["querystring", "cookie"], 
      caches: ["cookie"], 
    },
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
