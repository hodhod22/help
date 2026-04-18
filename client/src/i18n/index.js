import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const loadTranslations = async (lng) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/translations`);
  const translations = await response.json();
  const resources = {};
  translations.forEach((t) => {
    if (!resources[t.key]) resources[t.key] = {};
    resources[t.key][lng] = t[lng];
  });
  return resources;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "sv",
    interpolation: { escapeValue: false },
    resources: {},
  });

// Ladda översättningar vid start
loadTranslations(i18n.language).then((resources) => {
  i18n.addResources(i18n.language, "translation", resources);
});

export default i18n;
