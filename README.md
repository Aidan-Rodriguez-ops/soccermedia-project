# High Press Media - Soccer Stats & News Platform

A modern soccer media platform built with Next.js, featuring real-time match scores, statistics, and news.

## Features

- **Real-time Match Scores**: Live updates from 1,200+ leagues worldwide
- **League Standings**: Current standings for major leagues
- **Player Statistics**: Top scorers, assisters, and detailed player stats
- **Smart Caching**: Intelligent caching system to minimize API usage (stays under 10 requests/day)
- **Responsive Design**: Built with Tailwind CSS and shadcn/ui components

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up API Key

1. Sign up for a free API key at [API-Football](https://www.api-football.com/)
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Add your API key to `.env.local`:
   ```
   NEXT_PUBLIC_API_FOOTBALL_KEY=your_actual_api_key_here
   ```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Usage & Caching Strategy

The app uses **API-Football** with a free plan (100 requests/day). To stay well under this limit, we implement:

### Smart Caching

- **Live Matches**: 30 seconds cache (only refreshes if you reload)
- **Fixtures**: 15 minutes cache
- **Standings**: 1 hour cache
- **Statistics**: 1 hour cache
- **Team/Player Info**: 24 hours cache

### Request Management

- Daily limit: 95 requests (5 request buffer)
- Automatic request counter reset at midnight
- Fallback to mock data if limit is reached
- Cached responses prevent redundant API calls

### Estimated Daily Usage

With typical usage:
- Home page load: 1-2 requests (cached for 30s-15min)
- Stats page load: 2 requests (cached for 1 hour)
- **Total**: ~5-10 requests per day with normal traffic

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx         # Home page with live scores
│   ├── stats/           # Statistics and standings
│   ├── news/            # News articles
│   ├── teams/           # Team pages
│   └── ...
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── header.tsx
│   ├── footer.tsx
│   └── ...
├── lib/                # Utilities
│   ├── api-football.ts # API service layer
│   └── cache.ts        # Caching system
└── types/              # TypeScript types
    └── football.ts
```

## Technologies

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **API**: API-Football (via RapidAPI)
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## API Information

- **Provider**: [API-Football](https://www.api-football.com/)
- **Free Plan**: 100 requests/day
- **Coverage**: 1,200+ leagues
- **Update Frequency**: Every 15 seconds for live matches
- **Documentation**: [API-Football Docs](https://www.api-football.com/documentation-v3)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Make sure to add your `NEXT_PUBLIC_API_FOOTBALL_KEY` environment variable in the Vercel project settings.
