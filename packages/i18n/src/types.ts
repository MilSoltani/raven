export type SupportedLanguage = 'en' | 'de' | 'fr' | 'es'
export type Translation = Record<string, string>
export type Group = Record<string, Translation>
export type Namespace = Record<string, Group>
export type LocaleMap = Record<SupportedLanguage, Namespace>
