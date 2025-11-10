# Split-Screen Chat Interface

## Overview

The split-screen chat interface provides context-aware AI assistance across all features. When users click the floating chat button, a chat panel slides in from the right side, showing relevant conversation starters based on the current feature they're viewing.

## Key Features

### 🎯 Context-Aware Conversation Starters
Each feature displays tailored conversation starters:

**Echoes of Battle:**
- Battles Fought Analysis
- Win Rate Performance
- Role Performance
- Champion Pool
- Streak Analysis

**Patterns Beneath the Chaos:**
- Signature Playstyle
- Core Strengths
- Growth Opportunities
- Matchup Adaptation

**Faultlines:**
- Combat Efficiency Index (CEI)
- Objective Reliability Index (ORI)
- Survival Discipline Index (SDI)
- Vision & Awareness Index (VAI)
- Economy Utilization Index (EUI)
- Momentum Index (MI)
- Composure Index (CI)

**The Arc:**
- Growth Trajectory
- Performance Trends

**Voice in the Fog:**
- General Performance
- Strategic Advice
- Mental Game

### 🎨 Split-Screen Behavior

**Desktop (>1024px):**
- Chat slides in from right
- Takes 45% of screen width (480-600px)
- Main content remains visible on left
- No backdrop overlay

**Mobile (<1024px):**
- Chat takes full width
- Backdrop overlay dims background
- Click backdrop to close

### 💬 Chat Flow

1. **Initial State**: Floating button appears in bottom-right
2. **Click Button**: Split-screen opens with conversation starters
3. **Select Topic**: Click a starter card to begin conversation
4. **Chat Interface**: Starters disappear, chat messages appear
5. **Context Reset**: Switching features resets chat and shows new starters

## Components

### `SplitScreenChat.tsx`
Main chat component with:
- Context-aware conversation starters
- Message history
- Input field with send button
- Typing indicator
- Auto-scroll behavior

### `SplitScreenChat.styles.ts`
Styled components:
- `SplitScreenOverlay`: Sliding panel
- `SplitScreenBackdrop`: Mobile backdrop
- `FloatingChatButton`: Fixed floating button
- `StarterCard`: Clickable conversation starters
- All chat UI elements

### `contextService.ts`
Returns appropriate conversation starters based on feature context

### `FeatureContext.ts`
TypeScript types for feature identification and conversation starters

## Integration

### JourneyDashboard

```typescript
const [isChatOpen, setIsChatOpen] = useState(false);

// Map section ID to feature context
const getFeatureContext = (section: SectionId): FeatureContext => {
  return section as FeatureContext;
};

// Hide button on Voice in the Fog page
const showFloatingButton = activeSection !== 'voice';
```

### Floating Button Visibility

The button appears on all pages **except** the Voice in the Fog feature page (since that page IS the chat interface).

## Styling Details

### Colors
- **Button Gradient**: Purple (#9333ea) to Blue (#3b82f6)
- **Chat Background**: Dark slate with gradient
- **User Messages**: Blue gradient, right-aligned
- **AI Messages**: Slate gradient, left-aligned
- **Starters**: Subtle hover effects with purple accent

### Animations
- **Slide In/Out**: 0.4s cubic-bezier easing
- **Pulse Effect**: 2s infinite pulse on floating button
- **Hover States**: Smooth 0.2s transitions
- **Message Fade**: 0.3s fade-in for new messages

### Responsive Breakpoints
- Desktop: `min-width: 1025px`
- Mobile: `max-width: 1024px`

## User Experience

### Chat Persistence
- Messages persist while chat is open
- Closing chat **preserves** conversation
- Switching features **resets** chat

### Keyboard Support
- `Enter`: Send message
- `Shift + Enter`: New line
- `Esc`: Close chat (could be added)

### Loading States
- Typing indicator with bouncing dots
- Disabled input during API calls
- Button disabled when no player connected

## API Integration

Messages are sent to:
```
POST /api/voice-in-fog
{
  puuid: string,
  message: string
}
```

Conversation context from selected starters provides rich prompts to the AI.

## Future Enhancements

- [ ] Persist chat history per feature in localStorage
- [ ] Add "Clear Chat" button
- [ ] Quick actions (e.g., "Compare with last game")
- [ ] Rich message formatting (markdown support)
- [ ] Streaming responses
- [ ] Voice input
- [ ] Export conversation
- [ ] Minimize to pill (like modern chat widgets)
- [ ] Unread message indicator

## Development Notes

### Adding New Conversation Starters

Edit `contextService.ts`:
```typescript
case 'your-feature':
  return [
    {
      id: 'unique-id',
      title: 'Starter Title',
      description: 'What this conversation is about',
      prompt: 'The actual prompt sent to AI',
    },
  ];
```

### Customizing Button Position

Edit `FloatingChatButton` in `SplitScreenChat.styles.ts`:
```typescript
bottom: 24px;  // Distance from bottom
right: 24px;   // Distance from right
```

### Adjusting Panel Width

Edit `SplitScreenOverlay`:
```typescript
width: ${props => props.$isOpen ? '45%' : '0'};
min-width: ${props => props.$isOpen ? '480px' : '0'};
max-width: ${props => props.$isOpen ? '600px' : '0'};
```

## Testing Checklist

- [x] Floating button appears on all features (except Voice page)
- [x] Split-screen opens/closes smoothly
- [x] Conversation starters change per feature
- [x] Messages send and receive correctly
- [x] Typing indicator shows during loading
- [x] Auto-scroll works
- [x] Mobile responsive behavior
- [x] Backdrop closes chat on mobile
- [x] Chat resets when switching features
- [x] Button disabled without player
- [ ] Keyboard shortcuts work
- [ ] Error states display properly
- [ ] Long messages wrap correctly
- [ ] Scrollbar appears when needed

## Accessibility

- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Semantic HTML structure
- ⚠️ Screen reader announcements (could be improved)
- ⚠️ High contrast mode support (could be improved)
