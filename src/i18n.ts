import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import de from "./locales/de.json";
import ru from "./locales/ru.json";

i18n
  .use(LanguageDetector) // automatically detects browser language
  .use(initReactI18next) // connects react-i18next
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      ru: { translation: ru },
    },
    fallbackLng: "de", // default language (German)
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
