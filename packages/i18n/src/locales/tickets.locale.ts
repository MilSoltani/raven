import type { LocaleMap } from '../types'

export const ticketsLocale: LocaleMap = {
  en: {
    api: {
      response: {
        fetched: 'Fetched successfully',
        created: 'Created successfully',
        updated: 'Updated successfully',
        deleted: 'Deleted successfully',
      },

      validation: {
        statusInvalid: 'Invalid status',
        priorityInvalid: 'Invalid priority',

        idRequired: 'ID is required',
        idInvalid: 'Invalid ID',

        creatorIdRequired: 'Creator ID is required',
        creatorIdInvalid: 'Invalid creator ID',

        agentIdInvalid: 'Invalid agent ID',

        subjectRequired: 'Subject is required',
        subjectTooLong: 'Subject is too long',

        descriptionRequired: 'Description is required',

        updatedAtInvalid: 'Invalid updated date',
        createdAtInvalid: 'Invalid created date',
      },

      errors: {
        notFound: 'Ticket not found',
        internalError: 'Internal server error',
      },
    },

    web: {},
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
        statusInvalid: 'Ungültiger Status',
        priorityInvalid: 'Ungültige Priorität',

        idRequired: 'ID ist erforderlich',
        idInvalid: 'Ungültige ID',

        creatorIdRequired: 'Ersteller-ID ist erforderlich',
        creatorIdInvalid: 'Ungültige Ersteller-ID',

        agentIdInvalid: 'Ungültige Agenten-ID',

        subjectRequired: 'Betreff ist erforderlich',
        subjectTooLong: 'Betreff ist zu lang',

        descriptionRequired: 'Beschreibung ist erforderlich',

        updatedAtInvalid: 'Ungültiges Aktualisierungsdatum',
        createdAtInvalid: 'Ungültiges Erstellungsdatum',
      },

      errors: {
        notFound: 'Ticket nicht gefunden',
        internalError: 'Interner Serverfehler',
      },
    },

    web: {},
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
        statusInvalid: 'Statut invalide',
        priorityInvalid: 'Priorité invalide',

        idRequired: 'L\'identifiant est requis',
        idInvalid: 'Identifiant invalide',

        creatorIdRequired: 'L\'identifiant du créateur est requis',
        creatorIdInvalid: 'Identifiant du créateur invalide',

        agentIdInvalid: 'Identifiant de l\'agent invalide',

        subjectRequired: 'Le sujet est requis',
        subjectTooLong: 'Le sujet est trop long',

        descriptionRequired: 'La description est requise',

        updatedAtInvalid: 'Date de mise à jour invalide',
        createdAtInvalid: 'Date de création invalide',
      },

      errors: {
        notFound: 'Ticket introuvable',
        internalError: 'Erreur interne du serveur',
      },
    },

    web: {},
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
        statusInvalid: 'Estado inválido',
        priorityInvalid: 'Prioridad inválida',

        idRequired: 'El ID es obligatorio',
        idInvalid: 'ID inválido',

        creatorIdRequired: 'El ID del creador es obligatorio',
        creatorIdInvalid: 'ID del creador inválido',

        agentIdInvalid: 'ID del agente inválido',

        subjectRequired: 'El asunto es obligatorio',
        subjectTooLong: 'El asunto es demasiado largo',

        descriptionRequired: 'La descripción es obligatoria',

        updatedAtInvalid: 'Fecha de actualización inválida',
        createdAtInvalid: 'Fecha de creación inválida',
      },

      errors: {
        notFound: 'Ticket no encontrado',
        internalError: 'Error interno del servidor',
      },
    },

    web: {},
  },
}
