export function createPolicyUtil(refreshExpirySeconds: number) {
  return {
    expiryDate() {
      return new Date(Date.now() + refreshExpirySeconds * 1000)
    },
  }
}

export type PolicyUtil = ReturnType<typeof createPolicyUtil>
