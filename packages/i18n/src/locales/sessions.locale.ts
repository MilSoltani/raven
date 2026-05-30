import type { LocaleMap } from '../types'

export const sessionsLocale: LocaleMap = {
  en: {
    api: {
      response: {
        created: 'Created successfully',
        updated: 'Updated successfully',
      },

      validation: {
        idRequired: 'ID is required',
        idInvalid: 'Invalid ID',

        userIdRequired: 'User ID is required',
        userIdInvalid: 'Invalid user ID',

        refreshTokenHashRequired: 'Refresh token hash is required',

        isRevokedRequired: 'isRevoked is required',

        expiresAtRequired: 'Expires at is required',
        createdAtRequired: 'Created at is required',
      },

      errors: {
        notFound: 'Session not found',
        revoked: 'Session is revoked',
        expired: 'Session is expired',
        internalError: 'Internal server error',
      },
    },

    web: {},
  },

  de: {
    api: {
      response: {
        created: 'Erfolgreich erstellt',
        updated: 'Erfolgreich aktualisiert',
      },

      validation: {
        idRequired: 'ID ist erforderlich',
        idInvalid: 'Ungültige ID',

        userIdRequired: 'Benutzer-ID ist erforderlich',
        userIdInvalid: 'Ungültige Benutzer-ID',

        refreshTokenHashRequired: 'Refresh-Token-Hash ist erforderlich',

        isRevokedRequired: 'isRevoked ist erforderlich',

        expiresAtRequired: 'Ablaufdatum ist erforderlich',
        createdAtRequired: 'Erstellungsdatum ist erforderlich',
      },

      errors: {
        notFound: 'Session nicht gefunden',
        revoked: 'Session ist widerrufen',
        expired: 'Session ist abgelaufen',
        internalError: 'Interner Serverfehler',
      },
    },

    web: {},
  },

  fr: {
    api: {
      response: {
        created: 'Création réussie',
        updated: 'Mise à jour réussie',
      },

      validation: {
        idRequired: 'L\'identifiant est requis',
        idInvalid: 'Identifiant invalide',

        userIdRequired: 'L\'identifiant utilisateur est requis',
        userIdInvalid: 'Identifiant utilisateur invalide',

        refreshTokenHashRequired: 'Hash du refresh token requis',

        isRevokedRequired: 'isRevoked est requis',

        expiresAtRequired: 'La date d\'expiration est requise',
        createdAtRequired: 'La date de création est requise',
      },

      errors: {
        notFound: 'Session introuvable',
        revoked: 'Session révoquée',
        expired: 'Session expirée',
        internalError: 'Erreur interne du serveur',
      },
    },

    web: {},
  },

  es: {
    api: {
      response: {
        created: 'Creado correctamente',
        updated: 'Actualizado correctamente',
      },

      validation: {
        idRequired: 'El ID es obligatorio',
        idInvalid: 'ID inválido',

        userIdRequired: 'El ID de usuario es obligatorio',
        userIdInvalid: 'ID de usuario inválido',

        refreshTokenHashRequired: 'Se requiere el hash del refresh token',

        isRevokedRequired: 'isRevoked es obligatorio',

        expiresAtRequired: 'La fecha de expiración es obligatoria',
        createdAtRequired: 'La fecha de creación es obligatoria',
      },

      errors: {
        notFound: 'Sesión no encontrada',
        revoked: 'Sesión revocada',
        expired: 'Sesión expirada',
        internalError: 'Error interno del servidor',
      },
    },

    web: {},
  },
}
