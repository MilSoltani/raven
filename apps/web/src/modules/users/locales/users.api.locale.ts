import type { UsersResponseKey } from '@raven/api/modules/users'
import type { SupportedLanguage } from '@raven/web/common/utils/i18n'

type UsersApiMessages = Record<UsersResponseKey, string>

export const usersApiLocale = {
  en: {
    fetched: 'Fetched successfully',
    created: 'Created successfully',
    updated: 'Updated successfully',
    deleted: 'Deleted successfully',

    nameRequired: 'Name is required',
    nameTooLong: 'Name is too long',

    emailInvalid: 'Invalid email address',

    createdAtInvalid: 'Invalid created date',
    updatedAtInvalid: 'Invalid updated date',

    notFound: 'User not found',
    internalError: 'Internal server error',
  },

  de: {
    fetched: 'Erfolgreich geladen',
    created: 'Erfolgreich erstellt',
    updated: 'Erfolgreich aktualisiert',
    deleted: 'Erfolgreich gelöscht',

    nameRequired: 'Name ist erforderlich',
    nameTooLong: 'Name ist zu lang',

    emailInvalid: 'Ungültige E-Mail-Adresse',

    createdAtInvalid: 'Ungültiges Erstellungsdatum',
    updatedAtInvalid: 'Ungültiges Aktualisierungsdatum',

    notFound: 'Benutzer nicht gefunden',
    internalError: 'Interner Serverfehler',
  },

  fr: {
    fetched: 'Récupération réussie',
    created: 'Création réussie',
    updated: 'Mise à jour réussie',
    deleted: 'Suppression réussie',

    nameRequired: 'Le nom est requis',
    nameTooLong: 'Le nom est trop long',

    emailInvalid: 'Adresse e-mail invalide',

    createdAtInvalid: 'Date de création invalide',
    updatedAtInvalid: 'Date de mise à jour invalide',

    notFound: 'Utilisateur introuvable',
    internalError: 'Erreur interne du serveur',
  },

  sp: {
    fetched: 'Obtenido correctamente',
    created: 'Creado correctamente',
    updated: 'Actualizado correctamente',
    deleted: 'Eliminado correctamente',

    nameRequired: 'El nombre es obligatorio',
    nameTooLong: 'El nombre es demasiado largo',

    emailInvalid: 'Dirección de correo inválida',

    createdAtInvalid: 'Fecha de creación inválida',
    updatedAtInvalid: 'Fecha de actualización inválida',

    notFound: 'Usuario no encontrado',
    internalError: 'Error interno del servidor',
  },
} satisfies Record<SupportedLanguage, UsersApiMessages>
