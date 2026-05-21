import type { Key, Lang } from './translations'
import { translations } from './translations'

export function createTranslator(lang: Lang) {
  return (key: Key) => {
    const dict = translations[lang]

    if (!dict?.[key]) {
      return translations.en[key] ?? key
    }

    return dict[key]
  }
}

export type Translator = ReturnType<typeof createTranslator>
