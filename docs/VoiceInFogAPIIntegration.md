# Voice in the Fog - API Integration

## Overview
The Voice in the Fog feature uses context-specific API endpoints to provide AI-powered insights for each analytics feature.

## API Endpoints

### Feature-Specific Endpoints

Each feature has its own dedicated endpoint:

1. **Echoes of Battle** (Win/Loss Analytics)
   ```
   GET /api/voice-in-fog/echoes-of-battle/{PLAYER_PUUID}?starter_topic={TOPIC}
   ```

2. **Patterns Beneath Chaos** (Playstyle Analysis)
   ```
   GET /api/voice-in-fog/patterns-beneath-chaos/{PLAYER_PUUID}?starter_topic={TOPIC}
   ```

3. **Faultlines** (Performance Indices)
   ```
   GET /api/voice-in-fog/faultlines-analysis/{PLAYER_PUUID}?starter_topic={TOPIC}
   ```

4. **The Arc** (Historical Trends)
   ```
   GET /api/voice-in-fog/the-arc/{PLAYER_PUUID}?starter_topic={TOPIC}
   ```

5. **Voice in the Fog** (General Chat)
   ```
   POST /api/voice-in-fog
   Body: { puuid: string, message: string }
   ```

## Starter Topics by Feature

### Echoes of Battle
- `Battles Fought` - Total game count and activity patterns
- `Claim / Fall Ratio` - Win rate and performance trends
- `Longest Claim & Fall Streaks` - Win/loss streaks and momentum
- `Clutch Battles` - Performance in close games
- `Role Influence` - Performance across different roles

### Patterns Beneath Chaos
- `Aggression` - Combat initiative and forward positioning
- `Survivability` - Ability to avoid deaths and stay alive
- `Skirmish Bias` - Tendency for small fights vs teamfights
- `Objective Impact` - Contribution to major objectives
- `Vision Discipline` - Warding and map control
- `Utility` - Team support and enabling plays
- `Tempo Profile` - Phase-by-phase momentum and economy

### Faultlines
- `Combat Efficiency Index` - Skirmish efficiency and KDA conversion
- `Objective Reliability Index` - Major objective impact
- `Survival Discipline Index` - Death avoidance and positioning
- `Vision & Awareness Index` - Ward placement and map awareness
- `Economy Utilization Index` - Gold conversion efficiency
- `Momentum Index` - Streak dynamics and tilt resistance
- `Composure Index` - Performance consistency

## Implementation

### Service Layer
The `voiceInFogService` provides two methods:

1. **sendMessage** - For free-form chat in the Voice in the Fog section
   ```typescript
   voiceInFogService.sendMessage({
     puuid: string,
     message: string
   })
   ```

2. **sendStarterTopic** - For one-shot Q&A in feature-specific contexts
   ```typescript
   voiceInFogService.sendStarterTopic({
     puuid: string,
     featureContext: 'echoes' | 'patterns' | 'faultlines' | 'arc' | 'voice',
     starterTopic: string
   })
   ```

### Component Integration

#### OneShotChat (Split-Screen)
- Used in Echoes, Patterns, and Faultlines sections
- Displays conversation starters at the top
- One-shot Q&A style - each starter click replaces previous conversation
- Uses `sendStarterTopic` API method

#### VoiceInFogDashboard (Full Page)
- Dedicated Voice in the Fog section
- Free-form chat with message history
- Uses `sendMessage` API method

### URL Parameters
The API expects starter topics as URL-encoded query parameters:
- Spaces: `%20`
- Forward slash: `%2F`
- Ampersand: `%26`

Example:
```
Longest Claim & Fall Streaks → Longest%20Claim%20%26%20Fall%20Streaks
```

## Response Format

All endpoints return:
```typescript
{
  response: string;      // AI-generated response
  timestamp: string;     // ISO 8601 timestamp
}
```

## Error Handling

The service handles errors gracefully:
- Network errors
- Timeout errors (30 second timeout)
- API response errors
- Invalid player PUUID

Error messages are displayed as assistant messages in the chat interface.

## Configuration

Base URL is configured via environment variable:
```
VITE_LEGENDSCOPE_API_BASE_URL=http://localhost:3000/api
```
