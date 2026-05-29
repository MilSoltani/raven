export const ticketsResponseKeys = {
  success: {
    fetched: 'fetched',
    created: 'created',
    updated: 'updated',
    deleted: 'deleted',
  },

  validation: {
    statusInvalid: 'statusInvalid',
    priorityInvalid: 'priorityInvalid',

    idRequired: 'idRequired',
    idInvalid: 'idInvalid',

    creatorIdRequired: 'creatorIdRequired',
    creatorIdInvalid: 'creatorIdInvalid',

    agentIdInvalid: 'agentIdInvalid',

    subjectRequired: 'subjectRequired',
    subjectTooLong: 'subjectTooLong',

    descriptionRequired: 'descriptionRequired',

    updatedAtInvalid: 'updatedAtInvalid',
    createdAtInvalid: 'createdAtInvalid',
  },

  error: {
    notFound: 'notFound',
    internalError: 'internalError',
  },
} as const

const _ticketsResponseKeysFlat = {
  ...ticketsResponseKeys.success,
  ...ticketsResponseKeys.validation,
  ...ticketsResponseKeys.error,
} as const

export type TicketsResponseKeys = typeof _ticketsResponseKeysFlat

export type TicketsResponseKey
  = (typeof _ticketsResponseKeysFlat)[keyof typeof _ticketsResponseKeysFlat]

export const ticketsCode = <T extends TicketsResponseKey>(code: T) => code
