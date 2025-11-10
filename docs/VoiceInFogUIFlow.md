# Voice in the Fog - UI Integration Flow

## ✅ Yes, the API integration is fully wired into the UI!

### How it Works

#### 1. **User Opens Chat** (Floating Button)
```
User clicks floating chat button (bottom right) 
  → Opens OneShotChat component in split-screen panel
  → Sidebar auto-collapses to make room
```

#### 2. **Conversation Starters Display**
```
OneShotChat component loads
  → Calls getConversationStarters(featureContext)
  → Displays feature-specific starter cards based on active section
```

**Example**: In Echoes of Battle section:
- Battles Fought
- Claim / Fall Ratio  
- Longest Claim & Fall Streaks
- Clutch Battles
- Role Influence

#### 3. **User Clicks a Starter Topic**
```
User clicks "Battles Fought"
  ↓
handleStarterClick() triggered
  ↓
Creates user message with topic title
  ↓
Calls voiceInFogService.sendStarterTopic({
  puuid: "player-uuid",
  featureContext: "echoes",
  starterTopic: "Battles Fought"
})
  ↓
API Request: GET /api/voice-in-fog/echoes-of-battle/{puuid}?starter_topic=Battles%20Fought
  ↓
Displays loading indicator (typing dots)
  ↓
Receives AI response
  ↓
Displays response in chat bubble
```

#### 4. **Context-Aware Topics**
The system automatically shows relevant topics based on which feature page is active:

| Active Section | Feature Context | API Endpoint | Topics Shown |
|---------------|----------------|--------------|--------------|
| Echoes of Battle | `echoes` | `/echoes-of-battle` | 5 battle-related topics |
| Patterns Beneath Chaos | `patterns` | `/patterns-beneath-chaos` | 7 playstyle topics |
| Faultlines | `faultlines` | `/faultlines-analysis` | 7 index topics |
| The Arc | `arc` | `/the-arc` | 2 growth topics |
| Voice in the Fog | `voice` | `/voice-in-fog` | 3 general topics |

### UI Component Tree

```
JourneyDashboard
├── MainContent
│   ├── MainLayout
│   │   ├── Sidebar
│   │   └── PageContainer
│   │       └── [Active Feature Component]
│   │           ├── EchoesOfBattle
│   │           ├── PatternsBeneathChaos
│   │           ├── Faultlines
│   │           └── VoiceInFog
│   └── FloatingChatButton (when not in Voice section)
│
└── ChatPanel (split-screen overlay)
    └── OneShotChat
        ├── SplitChatHeader (title + close button)
        ├── StartersSection (always visible)
        │   └── StartersGrid
        │       └── StarterCard[] (feature-specific topics)
        └── SplitMessagesContainer
            ├── EmptyState (before first message)
            └── MessageBubbles (after topic selected)
```

### Key Features

#### ✅ One-Shot Q&A Style
- Each topic click replaces the previous conversation
- Always shows starters at the top for easy re-selection
- "Ask another question" prompt after first response

#### ✅ Split-Screen Layout
- Chat panel slides in from the right (480px wide)
- Main content area adjusts width automatically
- Sidebar auto-collapses when chat opens
- Mobile responsive (full-screen overlay on small screens)

#### ✅ Context Awareness
- Topics change based on active feature section
- API endpoint automatically selected
- Topics are feature-specific and relevant

#### ✅ Loading States
- Typing indicator with animated dots
- Disabled state for buttons during loading
- Smooth animations for messages

#### ✅ Error Handling
- Network errors caught and displayed
- Timeout handling (30 seconds)
- User-friendly error messages
- "Try again" prompt on errors

### User Journey Example

1. **User is viewing Echoes of Battle dashboard**
   - Shows battle statistics and win/loss charts

2. **User clicks floating chat button**
   - Chat panel slides in from right
   - Sidebar collapses to 80px
   - Shows 5 Echoes-specific conversation starters

3. **User clicks "Claim / Fall Ratio"**
   - User message appears: "Claim / Fall Ratio"
   - Loading dots appear
   - API called: `GET /api/voice-in-fog/echoes-of-battle/{puuid}?starter_topic=Claim%20/%20Fall%20Ratio`
   - AI response appears with insights about win rate

4. **User wants more insights**
   - Starters still visible at top
   - Clicks "Clutch Battles"
   - Previous conversation replaced
   - New AI response about close games

5. **User closes chat**
   - Chat panel slides out
   - Sidebar expands back to 288px
   - User returns to dashboard

### Testing the Integration

To test the full flow:

1. Start the development server: `npm run dev`
2. Ensure backend API is running on `http://localhost:3000`
3. Navigate to any feature page (Echoes, Patterns, or Faultlines)
4. Click the floating chat button (purple gradient with chat icon)
5. Click any conversation starter
6. Verify API request is made and response is displayed

### Environment Configuration

Make sure your `.env` file has:
```
VITE_LEGENDSCOPE_API_BASE_URL=http://localhost:3000/api
```

### Next Steps

The integration is complete! The system will:
- ✅ Show feature-specific topics
- ✅ Send correct API requests with player PUUID
- ✅ Display AI responses in chat interface
- ✅ Handle loading and error states
- ✅ Provide smooth UX with animations

All that's needed is the backend API to be running and responding to the requests!
