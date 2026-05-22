export type Language = 'en' | 'de' | 'sp' | 'fr'
type Translations = Record<string, string>
type ModulesTranslations = Record<string, Translations>

export function createTranslator(
  translations: Record<string, ModulesTranslations>,
  module: string,
  language: Language,
) {
  return function t(key: string) {
    return translations[module][language][key]
  }
}

export type Translator = ReturnType<typeof createTranslator>
