import type { Lang } from './translations'
import { createMiddleware } from 'hono/factory'
import { translations } from './translations'
import { createTranslator } from './translator'

export function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && v in translations
}

export const translator = createMiddleware(async (c, next) => {
  const raw = c.get('language')
  const lang: Lang = isLang(raw) ? raw : 'en'

  const t = createTranslator(lang)
  c.set('t', t)

  await next()
})
