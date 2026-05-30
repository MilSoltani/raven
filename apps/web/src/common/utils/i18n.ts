import resources from '@raven/i18n'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const supportedLanguages = ['en', 'de', 'fr', 'es'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['api', 'web'],
  defaultNS: 'web',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
