import crypto from 'node:crypto'

export function createCryptoUtil(secret: string) {
	function hash(token: string) {
		return crypto.createHmac('sha256', secret).update(token).digest('hex')
	}

	function uuid() {
		return crypto.randomUUID()
	}

	return { hash, uuid }
}

export type CryptoUtil = ReturnType<typeof createCryptoUtil>
