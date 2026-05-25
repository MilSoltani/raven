import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { usersApiLocale } from '../modules/users'

const resources = {
  en: {
    ui: usersApiLocale.en,
  },
  de: {
    ui: usersApiLocale.de,
  },
  fr: {
    ui: usersApiLocale.fr,
  },
  sp: {
    ui: usersApiLocale.sp,
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
