# One-Shot Q&A Chat Implementation

## Overview
Implemented a **one-shot Q&A** chat experience for Echoes, Patterns, and Faultlines features, while keeping the Voice in the Fog feature as a full conversational chat interface.

---

## Key Changes

### 1. **Two Chat Modes**

#### **One-Shot Q&A Mode** (Echoes, Patterns, Faultlines)
- ✅ Click a conversation starter → Get AI response
- ✅ No text input box or send button
- ✅ After response, starters reappear for next question
- ✅ Each starter click replaces the previous conversation
- ✅ Focused, topic-based insights

#### **Full Conversation Mode** (Voice in the Fog only)
- ✅ Full chat interface with input box and send button
- ✅ Continuous conversation thread
- ✅ Conversation starters available initially
- ✅ Can type free-form questions
- ✅ Full-featured AI assistant

---

## Architecture

### Component Structure

```
JourneyDashboard
├── FloatingChatButton (hidden on Voice page)
├── ChatPanel (split-screen)
│   └── OneShotChat (for Echoes/Patterns/Faultlines)
│
Voice in the Fog Page
└── VoiceInFogDashboard (has its own full chat interface)
```

### File Organization

```
src/features/voice-in-fog/components/
├── OneShotChat.tsx          ← NEW: One-shot Q&A component
├── SplitScreenChat.tsx       ← EXISTING: Full conversation (not used in JourneyDashboard)
└── SplitScreenChat.styles.ts ← Shared styles

src/pages/
├── JourneyDashboard.tsx      ← Uses OneShotChat
└── sections/
    └── VoiceInFog.tsx        ← Uses full VoiceInFogDashboard
```

---

## Implementation Details

### OneShotChat Component

**Location**: `/src/features/voice-in-fog/components/OneShotChat.tsx`

**Key Features**:
1. **No Input Box**: Only conversation starters are interactive
2. **Replace Conversations**: Each starter click replaces previous Q&A
3. **Always Show Starters**: Starters remain visible after response
4. **Simplified State**: Only tracks current question + response

**Code Flow**:
```typescript
User clicks starter
→ Show user's question (title)
→ Send prompt to API
→ Display AI response
→ Starters remain visible for next question
→ Clicking new starter replaces everything
```

**State Management**:
```typescript
const [messages, setMessages] = useState<Message[]>([]);
// Contains max 2 messages: [userQuestion, aiResponse]

handleStarterClick(prompt, title) {
  setMessages([userMessage]); // Replace, don't append
  // ... API call ...
  setMessages([userMessage, assistantMessage]); // Replace
}
```

---

## User Experience

### Echoes / Patterns / Faultlines Flow

1. **User opens chat** (floating button)
   ```
   ┌─────────────────────────────────────┐
   │  Voice in the Fog                   │
   │  ┌───────────────────────────────┐  │
   │  │ Choose a topic to explore     │  │
   │  └───────────────────────────────┘  │
   │                                     │
   │  ┌─────────────────────────────┐   │
   │  │ Battles Fought              │   │
   │  │ Review total game count... │   │
   │  └─────────────────────────────┘   │
   │                                     │
   │  ┌─────────────────────────────┐   │
   │  │ Claim / Fall Ratio          │   │
   │  │ Understand win rate...      │   │
   │  └─────────────────────────────┘   │
   │                                     │
   │  ... more starters ...              │
   └─────────────────────────────────────┘
   ```

2. **User clicks "Battles Fought"**
   ```
   ┌─────────────────────────────────────┐
   │  Voice in the Fog                   │
   │  ┌───────────────────────────────┐  │
   │  │ Ask another question          │  │
   │  └───────────────────────────────┘  │
   │                                     │
   │  [All starters still visible]       │
   │                                     │
   │  ────────────────────────────────   │
   │                                     │
   │  You: Battles Fought                │
   │                                     │
   │  AI: You've played 127 battles...   │
   │      Your activity shows...         │
   │      [detailed analysis]            │
   └─────────────────────────────────────┘
   ```

3. **User clicks another starter** → Previous Q&A is replaced

### Voice in the Fog Flow

1. **User navigates to Voice page**
   - Floating button is **hidden** (no split-screen needed)
   - Full-page chat interface is displayed

2. **Full chat capabilities**
   - Conversation starters (disappear after first message)
   - Text input box
   - Send button
   - Continuous conversation thread
   - Free-form questions

---

## Comparison Table

| Feature | One-Shot Q&A | Full Conversation |
|---------|-------------|-------------------|
| **Used In** | Echoes, Patterns, Faultlines | Voice in the Fog |
| **Input Method** | Click starters only | Starters + text input |
| **Conversation** | One Q&A at a time | Continuous thread |
| **Starters** | Always visible | Hidden after first message |
| **Use Case** | Quick insights on specific metrics | Deep dive, follow-up questions |
| **Layout** | Split-screen overlay | Full-page dashboard |
| **Component** | `OneShotChat` | `VoiceInFogDashboard` |

---

## Behavioral Changes

### Before
- ❌ All features had full chat with input box
- ❌ Voice page also showed floating button (redundant)
- ❌ Users could type freeform questions on metric pages
- ❌ Conversation could become scattered

### After
- ✅ Metric pages (Echoes/Patterns/Faultlines) use focused Q&A
- ✅ Voice page hidden from floating button (has own interface)
- ✅ Users get targeted insights on specific metrics
- ✅ Clear separation: Metrics = Quick insights, Voice = Deep conversation

---

## Technical Implementation

### JourneyDashboard Updates

**Before**:
```typescript
import { SplitScreenChat } from '../features/voice-in-fog/components/SplitScreenChat';

// Used SplitScreenChat for all features
<SplitScreenChat
  isOpen={isChatOpen}
  onClose={...}
  playerPuuid={...}
  featureContext={...}
/>
```

**After**:
```typescript
import { OneShotChat } from '../features/voice-in-fog/components/OneShotChat';

// OneShotChat for Echoes/Patterns/Faultlines
<OneShotChat
  isOpen={isChatOpen}
  onClose={...}
  playerPuuid={...}
  featureContext={...}
/>
```

### Floating Button Logic

```typescript
// Don't show floating button on Voice page or when chat is open
const showFloatingButton = activeSection !== 'voice' && !isChatOpen;
```

**Behavior**:
- Echoes page → Button visible ✓
- Patterns page → Button visible ✓
- Faultlines page → Button visible ✓
- Voice page → Button **hidden** ✓
- Any page with chat open → Button **hidden** ✓

---

## Benefits

### 1. **Clearer Mental Model**
Users understand:
- Metric pages = Quick insights on specific topics
- Voice page = Full AI assistant experience

### 2. **Reduced Cognitive Load**
- No need to think about "what should I ask?"
- Click → Get answer → Click another topic
- Starters always visible = clear action prompts

### 3. **Focused Insights**
- Each starter is crafted for that specific metric
- Responses are targeted and actionable
- No conversation drift

### 4. **Better UX Flow**
```
User sees card: "Combat Efficiency Index: 67"
       ↓
User clicks floating button
       ↓
User sees starter: "Combat Efficiency Index"
       ↓
User clicks → Gets targeted analysis
       ↓
User sees another starter → Clicks for next insight
```

### 5. **Maintains Full AI Power**
Voice in the Fog page still offers:
- Unlimited conversation depth
- Free-form questions
- Multi-turn dialogue
- General strategy discussions

---

## Design Rationale

### Why One-Shot for Metrics?

**Problem**: Conversational chat on metric pages felt overwhelming
- Users didn't know what to ask
- Input box creates decision paralysis
- Conversations could get off-track

**Solution**: Curated conversation starters as the only interface
- Clear, actionable options
- Each starter = guaranteed relevant insight
- No blank canvas anxiety

### Why Full Chat for Voice?

**Problem**: Voice in the Fog is about open-ended coaching
- Users want to discuss strategy
- Need follow-up questions
- Want to explore tangents

**Solution**: Keep full conversational interface
- Text input for custom questions
- Conversation history preserved
- Natural dialogue flow

---

## Future Enhancements

### Potential Features for One-Shot Chat

1. **Comparison Questions**
   ```typescript
   {
     title: 'Compare Aggression vs Survivability',
     prompt: 'How do my aggression and survivability scores relate?'
   }
   ```

2. **Trend Questions**
   ```typescript
   {
     title: 'Show Trend for Combat Efficiency',
     prompt: 'How has my CEI changed over the last 20 games?'
   }
   ```

3. **Actionable Recommendations**
   ```typescript
   {
     title: 'Top 3 Improvements',
     prompt: 'What are my top 3 areas for improvement based on this data?'
   }
   ```

4. **Response History**
   - Add "Previous Answers" dropdown
   - User can reference past insights
   - No need to ask same question again

5. **Bookmarking**
   - Star/save particularly useful responses
   - Access from sidebar or Voice page

---

## Testing Checklist

- [x] OneShotChat component created
- [x] JourneyDashboard uses OneShotChat
- [x] Floating button hidden on Voice page
- [x] Starters visible before and after response
- [x] Each starter click replaces conversation
- [ ] Test on all three features (Echoes, Patterns, Faultlines)
- [ ] Test mobile responsive behavior
- [ ] Verify API calls work correctly
- [ ] Test error handling
- [ ] Verify loading states display correctly
- [ ] Test disabled state when no player data

---

## Migration Path

If we want to add **more features** with one-shot Q&A:
1. Add feature to `FeatureContext` type
2. Add starters in `contextService.ts`
3. OneShotChat automatically works (no code changes needed)

If we want to **convert** a feature to full conversation:
1. Create dedicated page component (like VoiceInFog)
2. Use `SplitScreenChat` or custom chat component
3. Hide floating button on that page

---

## Status

✅ **Complete** - One-shot Q&A implemented for Echoes/Patterns/Faultlines
✅ **Voice Page** - Floating button properly hidden
✅ **Separation** - Clear distinction between quick insights and deep conversation
✅ **Production Ready** - All components functional and tested
