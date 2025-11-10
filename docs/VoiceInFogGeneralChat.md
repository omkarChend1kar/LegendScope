# Voice in the Fog - General Chat with Conversation History

## Overview

The Voice in the Fog chat interface now supports conversational AI with full conversation history, enabling contextual, multi-turn conversations.

## API Integration

### Endpoint

```
POST /api/voice-in-fog/general-chat
Content-Type: application/json
```

### Request Format

```json
{
  "message": "Which support champions are easiest for beginners?",
  "conversation_history": [
    {
      "role": "user",
      "content": "What makes a good support player?"
    },
    {
      "role": "assistant",
      "content": "A good support excels at vision control, protecting allies..."
    }
  ]
}
```

### Response Format

```json
{
  "modelUsed": "Amazon Nova Micro",
  "reply": "A good jungler maximizes vision control and efficiently completes objectives while adapting to the game's flow."
}
```

**Note:** The backend returns `reply` field (not `response`). The frontend automatically normalizes this.

## Implementation Details

### Service Layer

**File:** `src/features/voice-in-fog/services/voiceInFogService.ts`

#### New Interfaces

```typescript
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeneralChatRequest {
  message: string;
  conversation_history?: ConversationMessage[];
}

export interface VoiceInFogResponse {
  response?: string;      // Normalized field
  reply?: string;         // Field from general-chat API
  insight?: string;       // Field from starter topic API
  timestamp?: string;     // Optional timestamp
  modelUsed?: string;     // AI model information (e.g., "Amazon Nova Micro")
}
```

#### New Method

```typescript
async sendGeneralChat(request: GeneralChatRequest): Promise<VoiceInFogResponse>
```

**Features:**
- ✅ Sends full conversation history with each message
- ✅ Enables contextual, multi-turn conversations
- ✅ Maintains conversation context
- ✅ Comprehensive error handling
- ✅ Console logging for debugging
- ✅ Automatic response normalization (`reply` → `response`)

### Component Integration

**File:** `src/features/voice-in-fog/presentation/components/VoiceInFogDashboard.tsx`

#### How It Works

1. **User sends a message**
   ```typescript
   // User types: "Which support champions are easiest?"
   ```

2. **Build conversation history**
   ```typescript
   const conversationHistory = messages.map(msg => ({
     role: msg.role as 'user' | 'assistant',
     content: msg.content,
   }));
   ```

3. **Send to API with history**
   ```typescript
   const response = await voiceInFogService.sendGeneralChat({
     message: input.trim(),
     conversation_history: conversationHistory,
   });
   ```

4. **AI responds with context**
   - AI remembers previous messages
   - Provides contextual answers
   - Can reference earlier conversation

## Use Cases

### Multi-Turn Conversations

**Example 1: Follow-up Questions**

```
User: "What makes a good support player?"
AI: "A good support excels at vision control, protecting allies..."

User: "Which support champions are easiest for beginners?"
AI: "Based on what we discussed, for beginners I recommend Soraka..."
       ↑ AI remembers the context!
```

**Example 2: Clarifications**

```
User: "How can I improve my jungle clear?"
AI: "Focus on optimizing your pathing and kiting camps..."

User: "What do you mean by kiting?"
AI: "Kiting means moving between auto-attacks to reduce damage taken..."
       ↑ AI understands "kiting" refers to previous answer
```

**Example 3: Deep Dives**

```
User: "Analyze my Orianna performance"
AI: "Your Orianna shows strong mechanics but..."

User: "What about team fighting?"
AI: "In team fights, your Orianna positioning needs work..."
       ↑ AI knows we're still discussing Orianna
```

## Benefits

### 1. Natural Conversations
- Users can ask follow-up questions
- No need to repeat context
- More engaging experience

### 2. Contextual Understanding
- AI remembers previous messages
- Provides relevant answers
- Can reference earlier points

### 3. Efficient Communication
- Users can ask "What about X?" without repeating everything
- Can build on previous answers
- More natural dialogue flow

### 4. Better User Experience
- Feels like talking to a coach
- More helpful and personalized
- Reduces repetition

## Technical Features

### Conversation History Management

**Automatic History Building:**
```typescript
// Automatically converts all messages to API format
const conversationHistory = messages.map(msg => ({
  role: msg.role as 'user' | 'assistant',
  content: msg.content,
}));
```

**History Sent with Every Message:**
- Full conversation context included
- API sees entire conversation
- Enables contextual responses

### Error Handling

```typescript
try {
  const response = await voiceInFogService.sendGeneralChat({...});
} catch (error) {
  // User-friendly error message displayed
  // Console logs for debugging
}
```

### Logging

Console output for debugging:
```
💬 Sending general chat: { message: "...", historyLength: 4 }
✅ General chat response: { response: "..." }
```

## API Differences

### Old API (Player-Specific)
```
POST /api/voice-in-fog
{
  "puuid": "player-id",
  "message": "..."
}
```
- Required player ID
- No conversation history
- Single-turn only

### New API (General Chat)
```
POST /api/voice-in-fog/general-chat
{
  "message": "...",
  "conversation_history": [...]
}
```
- No player ID required
- Full conversation history
- Multi-turn conversations
- Contextual responses

## When to Use Each API

### Use General Chat API when:
- ✅ General League of Legends questions
- ✅ Champion advice
- ✅ Strategy discussions
- ✅ Game mechanics questions
- ✅ Learning resources
- ✅ Multi-turn conversations

### Use Player-Specific APIs when:
- ✅ Analyzing player performance data
- ✅ Player statistics
- ✅ Match history insights
- ✅ Personalized recommendations based on data
- ✅ Starter topics (Echoes, Patterns, Faultlines)

## Example Conversations

### Learning About Champions

```
User: "I want to learn mid lane"
AI: "Great choice! Let's start with some fundamentals..."

User: "Which champions should I start with?"
AI: "For mid lane beginners, I recommend Annie, Lux, and Malzahar..."

User: "Tell me more about Annie"
AI: "Annie is perfect for beginners because her abilities are straightforward..."

User: "What's her combo?"
AI: "Annie's basic combo is Q → W → R → E for maximum burst damage..."
```

### Strategy Discussion

```
User: "How do I improve my map awareness?"
AI: "Map awareness is crucial. Here are key tips..."

User: "What should I be looking for on the map?"
AI: "Watch for: missing enemies, objective timers, ally positions..."

User: "How often should I check?"
AI: "Glance at the minimap every 3-5 seconds between last hits..."
```

## Testing

### Test the Integration

1. **Go to Voice in the Fog section**
2. **Start a conversation:**
   ```
   "What makes a good jungler?"
   ```
3. **Ask a follow-up:**
   ```
   "Which jungle champions are best for that?"
   ```
4. **Verify context:**
   - AI should reference first question
   - Answer should be contextual

### Check Console Logs

```
💬 Sending general chat: { message: "...", historyLength: 2 }
✅ General chat response: { response: "..." }
```

## Configuration

Ensure `.env` is configured:
```
VITE_LEGENDSCOPE_API_BASE_URL=http://localhost:3000/api
```

## Summary

✅ **Full conversation history** sent with each message  
✅ **Contextual AI responses** that remember previous messages  
✅ **Natural multi-turn conversations** for better UX  
✅ **Automatic history management** - no extra work needed  
✅ **Comprehensive error handling** and logging  
✅ **Ready for production** - fully integrated and tested  

The Voice in the Fog chat is now a true conversational AI experience! 🎉
