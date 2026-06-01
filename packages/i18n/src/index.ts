import deApi from './locales/de/api.json'
import deWeb from './locales/de/web.json'

import enApi from './locales/en/api.json'
import enWeb from './locales/en/web.json'

import esApi from './locales/es/api.json'
import esWeb from './locales/es/web.json'

import frApi from './locales/fr/api.json'
import frWeb from './locales/fr/web.json'

export const resources = {
	en: { api: enApi, web: enWeb },
	de: { api: deApi, web: deWeb },
	fr: { api: frApi, web: frWeb },
	es: { api: esApi, web: esWeb },
} as const

export default resources
