# Voice in the Fog

**An AI-powered chat companion for League of Legends analytics**

## Overview

Voice in the Fog is a conversational AI feature that allows players to ask questions about their performance, get strategic insights, and discuss their journey through the Rift. The interface is designed to match the aesthetic and layout patterns of other premium features in LegendScope.

## Design Philosophy

### Visual Consistency
- **Layout Structure**: Matches Echoes of Battle, Patterns Beneath the Chaos, and Faultlines
- **Color Scheme**: Purple-to-blue gradient titles, dark slate backgrounds
- **Typography**: Cinzel serif for headers, consistent with app-wide branding
- **Spacing**: Uses shared design tokens from `designTokens.ts`

### Chat Interface
- **Full-height Layout**: Takes advantage of viewport space like other features
- **Message Bubbles**: 
  - User messages: Blue gradient, right-aligned
  - AI responses: Slate gradient, left-aligned
- **Smooth Animations**: Fade-in for new messages, bouncing typing indicator
- **Auto-scroll**: Always shows the latest message
- **Empty State**: Welcoming message explaining the feature

## Components

### `VoiceInFogDashboard.tsx`
Main orchestrator component that:
- Manages message state
- Handles API communication
- Controls loading states
- Renders the complete chat interface

### Styled Components (`VoiceInFog.styles.ts`)
All styling using styled-components:
- `VoiceLayout`: Full-page wrapper
- `VoiceHeader`: Feature title and description
- `ChatContainer`: Main chat area with gradient background
- `MessagesContainer`: Scrollable message list
- `MessageBubble`: Individual message styling
- `InputContainer`: Message input area
- `TypingIndicator`: Animated dots for loading state

## Features

✅ **Real-time Chat**: Send messages and receive AI responses  
✅ **Typing Indicator**: Visual feedback while AI processes  
✅ **Auto-scroll**: Always shows latest messages  
✅ **Error Handling**: Graceful error messages  
✅ **Keyboard Support**: Enter to send, Shift+Enter for newlines  
✅ **Responsive Design**: Adapts to different screen sizes  
✅ **Theme Consistency**: Matches app-wide design system  

## API Integration

### Endpoint
```
POST /api/voice-in-fog
```

### Request
```typescript
{
  puuid: string;      // Player unique identifier
  message: string;    // User's question/message
}
```

### Response
```typescript
{
  response: string;   // AI's reply
  timestamp: string;  // ISO timestamp
}
```

## Usage

The feature is accessible via the sidebar navigation under "Voice in the Fog". When a player is connected, they can:

1. Click the "Voice in the Fog" section in the sidebar
2. Type questions in the input field
3. Press Enter or click Send
4. View AI responses in the chat

**Example Questions:**
- "How can I improve my KDA on Yasuo?"
- "What are my strongest roles?"
- "Should I focus more on farming or roaming?"
- "Analyze my recent losses"

## Technical Details

### State Management
- React hooks for local state
- Message history stored in component state
- No persistence (chat resets on page reload)

### Performance
- Optimized re-renders with `useCallback`
- Auto-scroll uses refs (no extra renders)
- Debounced typing indicators

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management

## Future Enhancements

- [ ] Persist chat history in localStorage
- [ ] Add "Clear Chat" button
- [ ] Streaming responses (character-by-character)
- [ ] Suggested questions/prompts
- [ ] Voice input support
- [ ] Export chat transcript
- [ ] Persona toggle (Analyst/Coach/Friend)
- [ ] Response confidence indicators

## File Structure

```
voice-in-fog/
├── components/                      # (Old overlay components - deprecated)
├── presentation/
│   ├── components/
│   │   └── VoiceInFogDashboard.tsx  # Main feature component
│   └── styles/
│       └── VoiceInFog.styles.ts     # All styled-components
├── services/
│   └── voiceInFogService.ts         # API integration
└── types/
    └── Message.ts                    # TypeScript interfaces
```

## Integration

Added to `JourneyDashboard.tsx`:
```typescript
case 'voice':
  return <VoiceInFog playerData={playerData} />;
```

Sidebar navigation automatically includes the section via `Sidebar.config.ts`.

An immersive AI companion chat interface for the LegendScope League of Legends analytics platform.

## 🎯 Overview

"Voice in the Fog" is a professional, theme-aligned chat interface that provides an AI-powered coaching companion. It slides in from the right side of the screen, collapses the main sidebar when opened, and offers a tactical command console aesthetic.

## 🏗️ Architecture

```
src/features/voice-in-fog/
├── components/
│   ├── ChatHeader.tsx           # Header with title and close button
│   ├── ChatTriggerButton.tsx    # Floating trigger button
│   ├── InputBar.tsx             # Message input with send button
│   ├── MessageBubble.tsx        # Individual message display
│   ├── MessageList.tsx          # Scrollable messages container
│   ├── TypingIndicator.tsx      # Animated typing indicator
│   └── VoiceInFogChat.tsx       # Main chat panel orchestrator
├── services/
│   └── voiceInFogService.ts     # API integration service
└── types/
    └── Message.ts               # TypeScript interfaces
```

## 🎨 Design Features

### Visual Style
- **Dark gradient background**: `#0d0d0f` → `#151820`
- **User messages**: Blue gradient with glow (`from-blue-600 to-blue-700`)
- **AI messages**: Slate gradient (`from-slate-800 to-slate-900`)
- **Trigger button**: Purple-to-blue gradient with pulsing glow effect
- **Typography**: Clean, legible with proper contrast

### Animations (Framer Motion)
- **Panel slide-in**: Spring animation from right
- **Message fade-in**: Smooth opacity + y-axis animation
- **Typing indicator**: Bouncing dots with staggered delays
- **Pulsing effects**: AI thinking indicator, trigger button glow
- **Backdrop blur**: Smooth overlay when chat is open

### Responsive Design
- **Desktop**: 480px wide panel
- **Mobile**: Full-width panel
- **Smooth transitions**: Spring physics for natural feel

## 🔧 Components

### `VoiceInFogChat`
Main container that orchestrates the entire chat interface.

**Props:**
- `isOpen: boolean` - Controls chat visibility
- `onClose: () => void` - Callback when chat is closed
- `playerPuuid: string | null` - Player identifier for API calls

**Features:**
- Message state management
- Loading state handling
- Error handling with user-friendly messages
- Backdrop overlay with click-to-close

### `ChatTriggerButton`
Floating action button in bottom-right corner.

**Features:**
- Pulsing glow animation
- Disabled state when no player connected
- Tooltip on hover
- Scale animations on interaction

### `ChatHeader`
Fixed header with branding and controls.

**Features:**
- Pulsing indicator when AI is thinking
- Close button
- Subtitle for context

### `MessageList`
Scrollable container for messages.

**Features:**
- Auto-scroll to latest message
- Empty state with welcome message
- Typing indicator when loading

### `MessageBubble`
Individual message display component.

**Features:**
- Left/right alignment based on sender
- Timestamp display
- Gradient backgrounds with shadows
- Smooth fade-in animation

### `InputBar`
Message input interface.

**Features:**
- Auto-resizing textarea
- Enter key to send (Shift+Enter for new line)
- Send button with loading state
- Disabled state handling

### `TypingIndicator`
Animated dots showing AI is processing.

**Features:**
- Three bouncing dots
- Staggered animation delays
- Matches AI message style

## 🔌 API Integration

### Service: `voiceInFogService`

**Endpoint:** `POST /api/voice-in-fog`

**Request:**
```typescript
{
  puuid: string;      // Player PUUID
  message: string;    // User's message
}
```

**Response:**
```typescript
{
  response: string;   // AI's response
  timestamp: string;  // ISO timestamp
}
```

**Timeout:** 30 seconds (configurable for AI processing)

## 🚀 Integration

### In JourneyDashboard

```tsx
const [isChatOpen, setIsChatOpen] = useState(false);

<VoiceInFogChat
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
  playerPuuid={playerData?.puuid ?? null}
/>

{!isChatOpen && (
  <ChatTriggerButton
    onClick={() => setIsChatOpen(true)}
    disabled={!playerData?.puuid}
  />
)}
```

### Sidebar Collapse

Pass `isChatOpen` to `MainLayout`'s `sidebarCollapsed` prop to hide sidebar when chat is active.

## 🎯 User Experience

### Interaction Flow

1. **User clicks trigger button** → Chat slides in from right, sidebar collapses
2. **User types message** → Input bar active, send button enabled
3. **User sends message** → Message appears, typing indicator shows
4. **AI responds** → Response fades in, auto-scrolls
5. **User closes chat** → Chat slides out, sidebar restores

### States

- **Empty**: Welcome message with emoji
- **Loading**: Typing indicator with pulsing header dot
- **Error**: Error message displayed as AI message
- **No Player**: Trigger button and input disabled

## 🧪 Testing

### Manual Testing Checklist

- [ ] Chat opens/closes smoothly
- [ ] Sidebar collapses when chat opens
- [ ] Messages send and display correctly
- [ ] Typing indicator shows during API call
- [ ] Auto-scroll works on new messages
- [ ] Enter key sends message
- [ ] Shift+Enter creates new line
- [ ] Close button works
- [ ] Backdrop click closes chat
- [ ] Disabled states work when no player
- [ ] Responsive design on mobile
- [ ] Animations are smooth

## 📦 Dependencies

- **React** - UI framework
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## 🎨 Color Palette

```css
/* Backgrounds */
--bg-primary: #0d0d0f
--bg-secondary: #151820
--bg-message-user: linear-gradient(to-br, #2563eb, #1d4ed8)
--bg-message-ai: linear-gradient(to-br, #1e293b, #0f172a)

/* Borders */
--border-default: #1e293b (slate-800)
--border-focus: #3b82f6 (blue-500)

/* Text */
--text-primary: #f1f5f9 (slate-100)
--text-secondary: #94a3b8 (slate-400)
--text-placeholder: #64748b (slate-500)

/* Accents */
--accent-purple: #9333ea (purple-600)
--accent-blue: #2563eb (blue-600)
```

## 🚧 Future Enhancements

- [ ] Persona toggle (Analyst vs Companion mode)
- [ ] Response confidence bar
- [ ] Chat history persistence (localStorage)
- [ ] Voice input support
- [ ] Export chat transcript
- [ ] Rich message formatting (markdown)
- [ ] Suggested prompts/questions
- [ ] Message reactions
- [ ] Dark/light theme toggle

## 📝 Notes

- All animations use spring physics for natural movement
- Message timestamps use browser locale
- API timeout is 30s to accommodate AI processing
- Chat state is component-local (not persisted)
- Smooth scroll behavior uses native browser APIs
- Keyboard navigation fully supported
