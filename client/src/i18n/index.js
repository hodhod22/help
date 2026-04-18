import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '../locales/en.json'
import sv from '../locales/sv.json'
import ar from '../locales/ar.json'

export const SUPPORTED_LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'sv', label: 'SV' },
  { code: 'ar', label: 'العربية' },
]

function applyDocumentLang(lng) {
  if (typeof document === 'undefined') return
  const base = String(lng || 'sv').split('-')[0]
  document.documentElement.lang = base
  document.documentElement.dir = i18n.dir(base)
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sv: { translation: sv },
      ar: { translation: ar },
    },
    fallbackLng: 'sv',
    supportedLngs: ['en', 'sv', 'ar'],
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

applyDocumentLang(i18n.language)
i18n.on('languageChanged', applyDocumentLang)

export default i18n
