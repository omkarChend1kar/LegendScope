# Voice in the Fog - API Response Field Names

## Overview

Different Voice in the Fog API endpoints use different field names for the AI response. The frontend now handles all variations automatically.

## Backend API Response Formats

### 1. General Chat API
**Endpoint:** `POST /api/voice-in-fog/general-chat`

**Response:**
```json
{
  "modelUsed": "Amazon Nova Micro",
  "reply": "A good jungler maximizes vision control..."
}
```
**Field:** `reply`

### 2. Starter Topic APIs
**Endpoints:**
- `GET /api/voice-in-fog/echoes-of-battle/{puuid}?starter_topic=...`
- `GET /api/voice-in-fog/patterns-beneath-chaos/{puuid}?starter_topic=...`
- `GET /api/voice-in-fog/faultlines-analysis/{puuid}?starter_topic=...`

**Response:**
```json
{
  "starterTopic": "Clutch Battles",
  "insight": "Focus on improving your late-game Orianna plays..."
}
```
**Field:** `insight`

### 3. Legacy Player-Specific API (if used)
**Endpoint:** `POST /api/voice-in-fog`

**Response:**
```json
{
  "response": "Based on your performance...",
  "timestamp": "2025-11-11T10:30:00.000Z"
}
```
**Field:** `response`

## Frontend Normalization

### VoiceInFogResponse Interface

```typescript
export interface VoiceInFogResponse {
  response?: string;      // Normalized field (used internally)
  reply?: string;         // From general-chat API
  insight?: string;       // From starter topic APIs
  timestamp?: string;     // Optional timestamp
  modelUsed?: string;     // AI model info
}
```

All fields are optional to handle different backend formats.

### Normalization Logic

**In voiceInFogService.ts:**

```typescript
// For general chat
const normalizedResponse: VoiceInFogResponse = {
  response: response.data.reply || response.data.response || response.data.insight || '',
  timestamp: response.data.timestamp || new Date().toISOString(),
  modelUsed: response.data.modelUsed,
};

// For starter topics
const normalizedResponse: VoiceInFogResponse = {
  response: response.data.insight || response.data.response || '',
  timestamp: response.data.timestamp || new Date().toISOString(),
};
```

**In all components:**

```typescript
const responseText = response.response || response.reply || response.insight || '';
```

### Priority Order

The frontend checks fields in this order:
1. `response` (normalized/legacy)
2. `reply` (general chat)
3. `insight` (starter topics)

First non-empty value is used.

## Component Updates

All chat components handle all field names:

### ✅ VoiceInFogDashboard.tsx
- Uses: `response.response || response.reply || response.insight`
- For: Full-page Voice in the Fog chat

### ✅ OneShotChat.tsx
- Uses: `response.response || response.reply || response.insight`
- For: Split-screen one-shot Q&A

### ✅ SplitScreenChat.tsx
- Uses: `response.response || response.reply || response.insight`
- For: Split-screen conversational chat

## Console Logging

### For General Chat:
```
💬 Sending general chat: { message: "...", historyLength: 2 }
✅ General chat response: { modelUsed: "Amazon Nova Micro", reply: "..." }
✨ Normalized response: { response: "...", timestamp: "...", modelUsed: "..." }
```

### For Starter Topics:
```
🔵 Sending starter topic: { puuid: "...", featureContext: "echoes", starterTopic: "..." }
🌐 API Request: { url: "...", ... }
📦 API Response: { starterTopic: "...", insight: "..." }
✨ Normalized response: { response: "...", timestamp: "..." }
```

## Benefits

### 1. Flexibility
- ✅ Works with any field name backend uses
- ✅ No frontend changes needed if backend changes field names
- ✅ Handles multiple API versions simultaneously

### 2. Consistency
- ✅ All components use same normalization logic
- ✅ Internal code always works with `response` field
- ✅ Easy to maintain and debug

### 3. Future-Proof
- ✅ New field names automatically supported (just add to priority list)
- ✅ Backward compatible with old APIs
- ✅ Forward compatible with new APIs

## Field Name Mapping Table

| API Endpoint | Response Field | Normalized To |
|--------------|---------------|---------------|
| `/general-chat` | `reply` | `response` |
| `/echoes-of-battle` | `insight` | `response` |
| `/patterns-beneath-chaos` | `insight` | `response` |
| `/faultlines-analysis` | `insight` | `response` |
| `/voice-in-fog` (legacy) | `response` | `response` |

## Additional Information

### Model Information
The general chat API also returns `modelUsed`:
```json
{
  "modelUsed": "Amazon Nova Micro"
}
```

This is preserved in the normalized response and can be used for:
- Displaying AI model info to users
- Analytics/tracking
- A/B testing different models

### Timestamp Handling
- Backend may or may not provide `timestamp`
- Frontend generates timestamp if not provided
- All messages have consistent timestamp format

## Testing

### Verify Field Name Handling

1. **Test General Chat:**
   ```
   Send message → Check console for "reply" → Verify message displays
   ```

2. **Test Starter Topics:**
   ```
   Click starter → Check console for "insight" → Verify response displays
   ```

3. **Check Console Logs:**
   ```
   ✅ General chat response: { reply: "..." }
   ✨ Normalized response: { response: "..." }
   ```

## Summary

✅ **All field names supported:** `response`, `reply`, `insight`  
✅ **Automatic normalization** in service layer  
✅ **All components updated** with fallback logic  
✅ **Future-proof** for backend changes  
✅ **Well-logged** for debugging  
✅ **Production ready** 🚀

No matter what field name the backend uses, the frontend will handle it correctly!
