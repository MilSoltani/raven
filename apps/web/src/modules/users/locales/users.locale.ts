import type { UsersCode } from '@raven/api/modules/users'
import type { SupportedLanguage } from '@raven/web/utils/i18n'

export const usersLocale: Record<SupportedLanguage, Record<UsersCode, any>> = {
  en: {
    USERS_FETCHED: 'Users fetched',
    USER_FETCHED: 'User fetched',
    USER_UPDATED: 'User updated',
    USER_DELETED: 'User deleted',
    USER_CREATED: 'User created',

    NAME_TOO_LONG: 'Name is too long',
    NAME_REQUIRED: 'Name is required',
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Invalid email',
    EMAIL_TOO_LONG: 'Email is too long',
    UPDATED_AT_INVALID: 'Invalid update date',
    CREATED_AT_REQUIRED: 'Creation date is required',

    USER_NOT_FOUND: 'User not found',
    INTERNAL_ERROR: 'Internal server error',
  },

  de: {
    USERS_FETCHED: 'Benutzer geladen',
    USER_FETCHED: 'Benutzer geladen',
    USER_UPDATED: 'Benutzer aktualisiert',
    USER_DELETED: 'Benutzer gelöscht',
    USER_CREATED: 'Benutzer erstellt',

    NAME_TOO_LONG: 'Name ist zu lang',
    NAME_REQUIRED: 'Name ist erforderlich',
    EMAIL_REQUIRED: 'E-Mail ist erforderlich',
    EMAIL_INVALID: 'Ungültige E-Mail',
    EMAIL_TOO_LONG: 'E-Mail ist zu lang',
    UPDATED_AT_INVALID: 'Ungültiges Aktualisierungsdatum',
    CREATED_AT_REQUIRED: 'Erstellungsdatum ist erforderlich',

    USER_NOT_FOUND: 'Benutzer nicht gefunden',
    INTERNAL_ERROR: 'Interner Serverfehler',
  },

  fr: {
    USERS_FETCHED: 'Utilisateurs récupérés',
    USER_FETCHED: 'Utilisateur récupéré',
    USER_UPDATED: 'Utilisateur mis à jour',
    USER_DELETED: 'Utilisateur supprimé',
    USER_CREATED: 'Utilisateur créé',

    NAME_TOO_LONG: 'Le nom est trop long',
    NAME_REQUIRED: 'Le nom est requis',
    EMAIL_REQUIRED: 'L\'e-mail est requis',
    EMAIL_INVALID: 'E-mail invalide',
    EMAIL_TOO_LONG: 'L\'e-mail est trop long',
    UPDATED_AT_INVALID: 'Date de mise à jour invalide',
    CREATED_AT_REQUIRED: 'La date de création est requise',

    USER_NOT_FOUND: 'Utilisateur introuvable',
    INTERNAL_ERROR: 'Erreur interne du serveur',
  },

  sp: {
    USERS_FETCHED: 'Usuarios obtenidos',
    USER_FETCHED: 'Usuario obtenido',
    USER_UPDATED: 'Usuario actualizado',
    USER_DELETED: 'Usuario eliminado',
    USER_CREATED: 'Usuario creado',

    NAME_TOO_LONG: 'El nombre es demasiado largo',
    NAME_REQUIRED: 'El nombre es obligatorio',
    EMAIL_REQUIRED: 'El correo es obligatorio',
    EMAIL_INVALID: 'Correo inválido',
    EMAIL_TOO_LONG: 'El correo es demasiado largo',
    UPDATED_AT_INVALID: 'Fecha de actualización inválida',
    CREATED_AT_REQUIRED: 'La fecha de creación es obligatoria',

    USER_NOT_FOUND: 'Usuario no encontrado',
    INTERNAL_ERROR: 'Error interno del servidor',
  },
}
