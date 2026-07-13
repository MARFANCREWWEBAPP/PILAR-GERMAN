const windowMs = 5 * 60 * 1000
const maxRequests = 15

const store = new Map<string, { count: number; resetAt: number }>()

export function consumeRateLimit(identifier: string) {
  const now = Date.now()
  const existing = store.get(identifier)

  if (!existing || existing.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) }
  }

  existing.count += 1
  store.set(identifier, existing)
  return { allowed: true }
}
