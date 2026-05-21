import de from './de.json'
import en from './en.json'
import fr from './fr.json'
import sp from './sp.json'

export const translations = { en, de, fr, sp } as const

export type Lang = keyof typeof translations
export type Key = keyof typeof translations['en']
