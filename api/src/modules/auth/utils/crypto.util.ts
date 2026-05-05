import crypto from 'node:crypto'

export function createCryptoUtil(secret: string) {
  return {
    hash(token: string) {
      return crypto
        .createHmac('sha256', secret)
        .update(token)
        .digest('hex')
    },

    random() {
      return crypto.randomBytes(32).toString('hex')
    },
  }
}

export type CryptoUtil = ReturnType<typeof createCryptoUtil>
