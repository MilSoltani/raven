import type { LocaleMap } from '../types'

export const queryLocale: LocaleMap = {
  en: {
    api: {
      response: {},

      validation: {
        operatorCombinationError: 'Invalid operator combination',
        maxDepthExceeded: 'Maximum query depth exceeded',
        maxLimitExceeded: 'Maximum limit exceeded',
        nonNumberLimitPage: 'Limit and page must be numbers',
        fieldNotAllowed: 'Field is not allowed',
        nonNumberPageLimit: 'Page and limit must be numbers',
      },

      errors: {},
    },

    web: {},
  },

  de: {
    api: {
      response: {},

      validation: {
        operatorCombinationError: 'Ungültige Operator-Kombination',
        maxDepthExceeded: 'Maximale Abfrage-Tiefe überschritten',
        maxLimitExceeded: 'Maximales Limit überschritten',
        nonNumberLimitPage: 'Limit und Seite müssen Zahlen sein',
        fieldNotAllowed: 'Feld ist nicht erlaubt',
        nonNumberPageLimit: 'Seite und Limit müssen Zahlen sein',
      },

      errors: {},
    },

    web: {},
  },

  fr: {
    api: {
      response: {},

      validation: {
        operatorCombinationError: 'Combinaison d’opérateurs invalide',
        maxDepthExceeded: 'Profondeur de requête maximale dépassée',
        maxLimitExceeded: 'Limite maximale dépassée',
        nonNumberLimitPage: 'La limite et la page doivent être des nombres',
        fieldNotAllowed: 'Champ non autorisé',
        nonNumberPageLimit: 'La page et la limite doivent être des nombres',
      },

      errors: {},
    },

    web: {},
  },

  es: {
    api: {
      response: {},

      validation: {
        operatorCombinationError: 'Combinación de operadores inválida',
        maxDepthExceeded: 'Profundidad máxima de consulta excedida',
        maxLimitExceeded: 'Límite máximo excedido',
        nonNumberLimitPage: 'El límite y la página deben ser números',
        fieldNotAllowed: 'Campo no permitido',
        nonNumberPageLimit: 'La página y el límite deben ser números',
      },

      errors: {},
    },

    web: {},
  },
}
