import { HTTPException } from 'hono/http-exception'

export class NotFoundException extends HTTPException {
  constructor(resource: string) {
    super(404, { message: `${resource} not found` })
  }
}

export class RevokedException extends HTTPException {
  constructor(resource: string) {
    super(401, { message: `${resource} is revoked` })
  }
}

export class ExpiredException extends HTTPException {
  constructor(resource: string) {
    super(401, { message: `${resource} is expired` })
  }
}

export class ReuseDetectedException extends HTTPException {
  constructor(resource: string) {
    super(409, { message: `${resource} reuse detected` })
  }
}

export class ConflictException extends HTTPException {
  constructor(resource: string) {
    super(409, { message: `${resource} already exists or operation conflicted` })
  }
}

export class ForbiddenException extends HTTPException {
  constructor(resource: string) {
    super(403, { message: `Access to ${resource} is forbidden` })
  }
}

export class InternalException extends HTTPException {
  constructor(resource: string) {
    super(500, { message: `Internal error processing ${resource}` })
  }
}
