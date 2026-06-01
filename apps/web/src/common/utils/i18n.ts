import resources from '@xenon/i18n'
import { env } from '@xenon/web/env'
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
	debug: env.VITE_ENV === 'development',
})

export default i18n
