/**
 * In-memory cache with TTL (Time To Live)
 * This helps minimize API requests by storing responses temporarily
 */

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

class Cache {
  private store: Map<string, CacheEntry<any>> = new Map()

  /**
   * Get cached data if it exists and hasn't expired
   */
  get<T>(key: string): T | null {
    const entry = this.store.get(key)

    if (!entry) {
      return null
    }

    // Check if cache has expired
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }

    return entry.data as T
  }

  /**
   * Store data in cache with a TTL in milliseconds
   */
  set<T>(key: string, data: T, ttlMs: number): void {
    this.store.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
    })
  }

  /**
   * Clear a specific cache entry
   */
  delete(key: string): void {
    this.store.delete(key)
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.store.clear()
  }

  /**
   * Remove expired entries (cleanup)
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key)
      }
    }
  }
}

// Singleton cache instance
export const cache = new Cache()

// Run cleanup every 5 minutes
if (typeof window !== "undefined") {
  setInterval(() => cache.cleanup(), 5 * 60 * 1000)
}

// Cache duration constants (in milliseconds)
export const CACHE_DURATION = {
  LIVE_MATCHES: 30 * 1000, // 30 seconds for live matches
  FIXTURES: 15 * 60 * 1000, // 15 minutes for upcoming/finished matches
  STANDINGS: 60 * 60 * 1000, // 1 hour for standings
  TEAM_INFO: 24 * 60 * 60 * 1000, // 24 hours for team info
  PLAYER_INFO: 24 * 60 * 60 * 1000, // 24 hours for player info
  STATISTICS: 60 * 60 * 1000, // 1 hour for statistics
} as const
