import type api from './locales/en/api.json'
import type web from './locales/en/web.json'

type ObjectPaths<T, Path extends string = ''> = {
	[K in keyof T & string]: T[K] extends Record<string, unknown>
		? ObjectPaths<T[K], `${Path}${K}.`>
		: `${Path}${K}`
}[keyof T & string]

type LocaleKey = ObjectPaths<typeof api> | ObjectPaths<typeof web>

export const translationKey = (key: LocaleKey) => key
