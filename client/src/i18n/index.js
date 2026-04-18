import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import sv from "../locales/sv.json";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

export const SUPPORTED_LANGS = [
  { code: "sv", name: "Svenska" },
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
];

const resources = {
  sv: { translation: sv },
  en: { translation: en },
  ar: { translation: ar },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "sv",
    interpolation: { escapeValue: false },
  });

export default i18n;
