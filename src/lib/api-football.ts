/**
 * API-Football Service
 * Handles all interactions with the API-Football API
 * Includes smart caching to minimize API requests
 */

import { cache, CACHE_DURATION } from "./cache"

const API_KEY = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY
const BASE_URL = process.env.API_FOOTBALL_BASE_URL || "https://v3.football.api-sports.io"

// Request counter to track daily usage
let requestCount = 0
const MAX_DAILY_REQUESTS = 95 // Leave 5 requests as buffer from 100 limit

/**
 * Reset request counter at midnight
 */
if (typeof window !== "undefined") {
  const now = new Date()
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const msUntilMidnight = tomorrow.getTime() - now.getTime()

  setTimeout(() => {
    requestCount = 0
    // Set up daily reset
    setInterval(() => {
      requestCount = 0
    }, 24 * 60 * 60 * 1000)
  }, msUntilMidnight)
}

/**
 * Check if we have requests remaining
 */
function canMakeRequest(): boolean {
  return requestCount < MAX_DAILY_REQUESTS
}

/**
 * Get remaining requests for the day
 */
export function getRemainingRequests(): number {
  return Math.max(0, MAX_DAILY_REQUESTS - requestCount)
}

/**
 * Generic fetch function with caching
 */
async function fetchFromAPI<T>(
  endpoint: string,
  params: Record<string, string> = {},
  cacheDuration: number = CACHE_DURATION.FIXTURES
): Promise<T | null> {
  // Create cache key from endpoint and params
  const cacheKey = `${endpoint}:${JSON.stringify(params)}`

  // Check cache first
  const cachedData = cache.get<T>(cacheKey)
  if (cachedData) {
    console.log(`[Cache HIT] ${endpoint}`)
    return cachedData
  }

  // Check if we can make a request
  if (!canMakeRequest()) {
    console.warn(`[API Limit] Daily request limit reached. Serving stale data or returning null.`)
    return null
  }

  // Check if API key is set
  if (!API_KEY || API_KEY === "your_api_key_here") {
    console.warn("[API Football] API key not configured")
    return null
  }

  try {
    const queryString = new URLSearchParams(params).toString()
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`

    console.log(`[API Request ${requestCount + 1}/${MAX_DAILY_REQUESTS}] ${endpoint}`)

    const response = await fetch(url, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    requestCount++

    // Cache the response
    cache.set(cacheKey, data.response, cacheDuration)

    return data.response as T
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error)
    return null
  }
}

/**
 * Get live matches (cached for 30 seconds)
 */
export async function getLiveMatches() {
  return fetchFromAPI("/fixtures", { live: "all" }, CACHE_DURATION.LIVE_MATCHES)
}

/**
 * Get fixtures by date (cached for 15 minutes)
 */
export async function getFixturesByDate(date: string) {
  return fetchFromAPI("/fixtures", { date }, CACHE_DURATION.FIXTURES)
}

/**
 * Get fixtures by league and season (cached for 15 minutes)
 */
export async function getFixturesByLeague(leagueId: string, season: string) {
  return fetchFromAPI("/fixtures", { league: leagueId, season }, CACHE_DURATION.FIXTURES)
}

/**
 * Get match details by ID (cached for 1 hour for finished matches, 30s for live)
 */
export async function getMatchById(matchId: string, isLive: boolean = false) {
  const cacheDuration = isLive ? CACHE_DURATION.LIVE_MATCHES : CACHE_DURATION.FIXTURES
  return fetchFromAPI(`/fixtures`, { id: matchId }, cacheDuration)
}

/**
 * Get standings for a league (cached for 1 hour)
 */
export async function getStandings(leagueId: string, season: string) {
  return fetchFromAPI("/standings", { league: leagueId, season }, CACHE_DURATION.STANDINGS)
}

/**
 * Get team statistics (cached for 1 hour)
 */
export async function getTeamStatistics(teamId: string, leagueId: string, season: string) {
  return fetchFromAPI(
    "/teams/statistics",
    { team: teamId, league: leagueId, season },
    CACHE_DURATION.STATISTICS
  )
}

/**
 * Get team info (cached for 24 hours)
 */
export async function getTeamInfo(teamId: string) {
  return fetchFromAPI("/teams", { id: teamId }, CACHE_DURATION.TEAM_INFO)
}

/**
 * Get player info (cached for 24 hours)
 */
export async function getPlayerInfo(playerId: string, season: string) {
  return fetchFromAPI("/players", { id: playerId, season }, CACHE_DURATION.PLAYER_INFO)
}

/**
 * Get top scorers for a league (cached for 1 hour)
 */
export async function getTopScorers(leagueId: string, season: string) {
  return fetchFromAPI(
    "/players/topscorers",
    { league: leagueId, season },
    CACHE_DURATION.STATISTICS
  )
}

/**
 * Get leagues (cached for 24 hours)
 */
export async function getLeagues() {
  return fetchFromAPI("/leagues", {}, CACHE_DURATION.TEAM_INFO)
}
