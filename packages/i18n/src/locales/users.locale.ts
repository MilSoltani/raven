import type { LocaleMap } from '../types'

export const usersLocale: LocaleMap = {
  en: {
    api: {
      response: {
        fetched: 'Fetched successfully',
        created: 'Created successfully',
        updated: 'Updated successfully',
        deleted: 'Deleted successfully',
      },

      validation: {
        nameRequired: 'Name is required',
        nameTooLong: 'Name is too long',

        emailInvalid: 'Invalid email address',

        createdAtInvalid: 'Invalid created date',
        updatedAtInvalid: 'Invalid updated date',
      },

      errors: {
        notFound: 'User not found',
        internalError: 'Internal server error',
      },
    },

    web: {
      entity: {
        name: 'name',
        email: 'email',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },

      form: {
        create: 'create',
        creating: 'creating',
        update: 'update',
        updating: 'updating',
      },

      ui: {
        loading: 'loading',
        loadingError: 'loadingError',
        details: 'details',
        invalidUserId: 'invalidUserId',
        drawerDescription: 'drawerDescription',
        openDrawerNotice: 'openDrawerNotice',
      },
    },
  },

  de: {
    api: {
      response: {
        fetched: 'Erfolgreich geladen',
        created: 'Erfolgreich erstellt',
        updated: 'Erfolgreich aktualisiert',
        deleted: 'Erfolgreich gelöscht',
      },

      validation: {
        nameRequired: 'Name ist erforderlich',
        nameTooLong: 'Name ist zu lang',

        emailInvalid: 'Ungültige E-Mail-Adresse',

        createdAtInvalid: 'Ungültiges Erstellungsdatum',
        updatedAtInvalid: 'Ungültiges Aktualisierungsdatum',
      },

      errors: {
        notFound: 'Benutzer nicht gefunden',
        internalError: 'Interner Serverfehler',
      },
    },

    web: {
      entity: {
        name: 'Name',
        email: 'E-Mail',
        createdAt: 'Erstellt am',
        updatedAt: 'Aktualisiert am',
      },

      form: {
        create: 'Erstellen',
        creating: 'Wird erstellt',
        update: 'Aktualisieren',
        updating: 'Wird aktualisiert',
      },

      ui: {
        loading: 'Lädt',
        loadingError: 'Fehler beim Laden',
        details: 'Details',
        invalidUserId: 'Ungültige Benutzer-ID',
        drawerDescription: 'Benutzerdetails anzeigen und bearbeiten',
        openDrawerNotice:
          'Wählen Sie einen Benutzer aus, um Details anzuzeigen',
      },
    },
  },

  fr: {
    api: {
      response: {
        fetched: 'Récupération réussie',
        created: 'Création réussie',
        updated: 'Mise à jour réussie',
        deleted: 'Suppression réussie',
      },

      validation: {
        nameRequired: 'Le nom est requis',
        nameTooLong: 'Le nom est trop long',

        emailInvalid: 'Adresse e-mail invalide',

        createdAtInvalid: 'Date de création invalide',
        updatedAtInvalid: 'Date de mise à jour invalide',
      },

      errors: {
        notFound: 'Utilisateur introuvable',
        internalError: 'Erreur interne du serveur',
      },
    },

    web: {
      entity: {
        name: 'Nom',
        email: 'E-mail',
        createdAt: 'Créé le',
        updatedAt: 'Mis à jour le',
      },

      form: {
        create: 'Créer',
        creating: 'Création en cours',
        update: 'Mettre à jour',
        updating: 'Mise à jour en cours',
      },

      ui: {
        loading: 'Chargement',
        loadingError: 'Erreur de chargement',
        details: 'Détails',
        invalidUserId: 'Identifiant utilisateur invalide',
        drawerDescription:
          'Afficher et modifier les détails de l\'utilisateur',
        openDrawerNotice:
          'Sélectionnez un utilisateur pour afficher les détails',
      },
    },
  },

  es: {
    api: {
      response: {
        fetched: 'Obtenido correctamente',
        created: 'Creado correctamente',
        updated: 'Actualizado correctamente',
        deleted: 'Eliminado correctamente',
      },

      validation: {
        nameRequired: 'El nombre es obligatorio',
        nameTooLong: 'El nombre es demasiado largo',

        emailInvalid: 'Dirección de correo inválida',

        createdAtInvalid: 'Fecha de creación inválida',
        updatedAtInvalid: 'Fecha de actualización inválida',
      },

      errors: {
        notFound: 'Usuario no encontrado',
        internalError: 'Error interno del servidor',
      },
    },

    web: {
      entity: {
        name: 'Nombre',
        email: 'Correo electrónico',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
      },

      form: {
        create: 'Crear',
        creating: 'Creando',
        update: 'Actualizar',
        updating: 'Actualizando',
      },

      ui: {
        loading: 'Cargando',
        loadingError: 'Error al cargar',
        details: 'Detalles',
        invalidUserId: 'ID de usuario inválido',
        drawerDescription:
          'Ver y editar los detalles del usuario',
        openDrawerNotice:
          'Seleccione un usuario para ver los detalles',
      },
    },
  },
}
