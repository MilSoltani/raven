import type { SupportedLanguage } from '@raven/web/common/utils/i18n'
import type { UsersUiKey } from './users-ui.keys'

type UsersUiText = Record<UsersUiKey, string>

export const usersUiLocale = {
  en: {
    name: 'Name',
    email: 'Email',
    createdAt: 'Created At',
    updatedAt: 'Updated At',

    create: 'Create',
    creating: 'Creating...',
    update: 'Update',
    updating: 'Updating...',

    loading: 'Loading...',
    loadingError: 'Failed to load users',
    details: 'Details',
    invalidUserId: 'Invalid user ID',
    drawerDescription: 'User details and information',
    openDrawerNotice: 'Select a user to view details',
  },

  de: {
    name: 'Name',
    email: 'E-Mail',
    createdAt: 'Erstellt am',
    updatedAt: 'Aktualisiert am',

    create: 'Erstellen',
    creating: 'Wird erstellt...',
    update: 'Aktualisieren',
    updating: 'Wird aktualisiert...',

    loading: 'Wird geladen...',
    loadingError: 'Benutzer konnten nicht geladen werden',
    details: 'Details',
    invalidUserId: 'Ungültige Benutzer-ID',
    drawerDescription: 'Benutzerdetails und Informationen',
    openDrawerNotice: 'Wählen Sie einen Benutzer aus, um Details anzuzeigen',
  },

  fr: {
    name: 'Nom',
    email: 'E-mail',
    createdAt: 'Créé le',
    updatedAt: 'Mis à jour le',

    create: 'Créer',
    creating: 'Création en cours...',
    update: 'Mettre à jour',
    updating: 'Mise à jour en cours...',

    loading: 'Chargement...',
    loadingError: 'Impossible de charger les utilisateurs',
    details: 'Détails',
    invalidUserId: 'ID d\'utilisateur invalide',
    drawerDescription: 'Détails et informations de l\'utilisateur',
    openDrawerNotice: 'Sélectionnez un utilisateur pour afficher les détails',
  },

  sp: {
    name: 'Nombre',
    email: 'Correo electrónico',
    createdAt: 'Creado el',
    updatedAt: 'Actualizado el',

    create: 'Crear',
    creating: 'Creando...',
    update: 'Actualizar',
    updating: 'Actualizando...',

    loading: 'Cargando...',
    loadingError: 'No se pudieron cargar los usuarios',
    details: 'Detalles',
    invalidUserId: 'ID de usuario no válido',
    drawerDescription: 'Detalles e información del usuario',
    openDrawerNotice: 'Seleccione un usuario para ver los detalles',
  },
} satisfies Record<SupportedLanguage, UsersUiText>
