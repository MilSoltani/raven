import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { usersApiLocale, usersUiLocale } from '../modules/users'

const resources = {
  en: {
    api: usersApiLocale.en,
    ui: usersUiLocale.en,
  },
  de: {
    api: usersApiLocale.de,
    ui: usersUiLocale.de,
  },
  fr: {
    api: usersApiLocale.fr,
    ui: usersUiLocale.fr,
  },
  sp: {
    api: usersApiLocale.sp,
    ui: usersUiLocale.sp,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['api', 'ui'],
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

export type SupportedLanguage = 'en' | 'de' | 'fr' | 'sp'
