/**
 * TypeScript types for API-Football responses
 */

export interface Team {
  id: number
  name: string
  logo: string
  winner?: boolean | null
}

export interface League {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
}

export interface Fixture {
  id: number
  referee: string | null
  timezone: string
  date: string
  timestamp: number
  periods: {
    first: number | null
    second: number | null
  }
  venue: {
    id: number | null
    name: string | null
    city: string | null
  }
  status: {
    long: string
    short: string
    elapsed: number | null
  }
}

export interface Goals {
  home: number | null
  away: number | null
}

export interface Score {
  halftime: Goals
  fulltime: Goals
  extratime: Goals
  penalty: Goals
}

export interface Match {
  fixture: Fixture
  league: League
  teams: {
    home: Team
    away: Team
  }
  goals: Goals
  score: Score
}

export interface Standing {
  rank: number
  team: Team
  points: number
  goalsDiff: number
  group: string
  form: string
  status: string
  description: string | null
  all: {
    played: number
    win: number
    draw: number
    lose: number
    goals: {
      for: number
      against: number
    }
  }
  home: {
    played: number
    win: number
    draw: number
    lose: number
    goals: {
      for: number
      against: number
    }
  }
  away: {
    played: number
    win: number
    draw: number
    lose: number
    goals: {
      for: number
      against: number
    }
  }
  update: string
}

export interface TeamStatistics {
  league: League
  team: Team
  form: string
  fixtures: {
    played: {
      home: number
      away: number
      total: number
    }
    wins: {
      home: number
      away: number
      total: number
    }
    draws: {
      home: number
      away: number
      total: number
    }
    loses: {
      home: number
      away: number
      total: number
    }
  }
  goals: {
    for: {
      total: {
        home: number
        away: number
        total: number
      }
      average: {
        home: string
        away: string
        total: string
      }
    }
    against: {
      total: {
        home: number
        away: number
        total: number
      }
      average: {
        home: string
        away: string
        total: string
      }
    }
  }
  biggest: {
    streak: {
      wins: number
      draws: number
      loses: number
    }
    wins: {
      home: string | null
      away: string | null
    }
    loses: {
      home: string | null
      away: string | null
    }
    goals: {
      for: {
        home: number
        away: number
      }
      against: {
        home: number
        away: number
      }
    }
  }
  clean_sheet: {
    home: number
    away: number
    total: number
  }
  failed_to_score: {
    home: number
    away: number
    total: number
  }
}

export interface Player {
  id: number
  name: string
  firstname: string
  lastname: string
  age: number
  birth: {
    date: string
    place: string
    country: string
  }
  nationality: string
  height: string
  weight: string
  photo: string
}

export interface PlayerStatistics {
  player: Player
  statistics: Array<{
    team: Team
    league: League
    games: {
      appearences: number
      lineups: number
      minutes: number
      position: string
      rating: string
    }
    goals: {
      total: number
      conceded: number
      assists: number
      saves: number
    }
    shots: {
      total: number
      on: number
    }
    passes: {
      total: number
      key: number
      accuracy: number
    }
    cards: {
      yellow: number
      red: number
    }
  }>
}
