import type { Context } from 'hono'

export function createHeaderUtil() {
  async function getIp(c: Context) {
    return c.req.header('x-forwarded-for')?.split(',')[0]
  }

  async function getUserAgent(c: Context) {
    return c.req.header('User-Agent')
  }

  return {
    getIp,
    getUserAgent,
  }
}

export type HeaderUtil = ReturnType<typeof createHeaderUtil>
