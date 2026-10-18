import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import ar from './ar.json'
import en from './en.json'

const resources = {
  ar: { translation: ar },
  en: { translation: en },
}

function updateDocument(language: string) {
  document.documentElement.lang = language
  document.documentElement.dir = i18n.dir(language)
}

i18n.on('languageChanged', updateDocument)

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['ar', 'en'],
    fallbackLng: 'ar',

    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'mawid-language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
