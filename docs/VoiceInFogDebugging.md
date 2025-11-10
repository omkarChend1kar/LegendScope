# Voice in the Fog - Debugging "Invalid Date" / Empty Bubble Issue

## Issue Description
When clicking "Role Influence" (or any starter topic), an empty chat bubble appears with "Invalid Date" below it.

## Root Causes & Solutions

### 1. Backend API Not Running
**Symptom:** Empty response or network error
**Solution:** Start your backend API server
```bash
# Make sure your backend is running on http://localhost:3000
```

### 2. Incorrect API Response Format
**Expected Response:**
```json
{
  "response": "Your AI-generated text here...",
  "timestamp": "2025-11-11T10:30:00.000Z"
}
```

**If Backend Returns Different Format:**
- Check backend logs for actual response structure
- Verify the response has `response` and `timestamp` fields

### 3. Empty Response from Backend
**Check Console Logs:**
Open browser DevTools Console and look for:
```
🔵 Sending starter topic: { puuid: "...", featureContext: "echoes", starterTopic: "Role Influence" }
🌐 API Request: { url: "...", params: {...}, fullUrl: "..." }
📦 API Response: { response: "...", timestamp: "..." }
```

**If Response is Empty:**
- Backend might not have data for that player
- Backend might not support that starter topic yet
- Check backend logs for errors

### 4. Invalid Timestamp Format
**Symptom:** Shows "Invalid Date" below message
**Cause:** Backend returns timestamp in wrong format
**Solution:** Backend should return ISO 8601 format:
```
"2025-11-11T10:30:00.000Z"
```

### 5. CORS Issues
**Symptom:** Network error in console
**Solution:** Backend needs CORS headers:
```javascript
// Backend should allow:
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

## Step-by-Step Debugging

### Step 1: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Click a starter topic
4. Look for these logs:
   - 🔵 Sending starter topic
   - 🌐 API Request
   - 📦 API Response (or ❌ Error)

### Step 2: Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Click a starter topic
4. Look for request to `/api/voice-in-fog/echoes-of-battle/...`
5. Check:
   - Status code (should be 200)
   - Response body
   - Response headers

### Step 3: Test API Directly
```bash
# Test the API endpoint directly
curl -X GET "http://localhost:3000/api/voice-in-fog/echoes-of-battle/YOUR_PUUID?starter_topic=Role%20Influence"
```

**Expected Response:**
```json
{
  "response": "Based on your last 20 matches...",
  "timestamp": "2025-11-11T10:30:00.000Z"
}
```

### Step 4: Check Environment Variables
Verify `.env` file exists:
```bash
# File: .env
VITE_LEGENDSCOPE_API_BASE_URL=http://localhost:3000/api
```

Restart dev server after changing .env:
```bash
npm run dev
```

## Common API Error Messages

### "Failed to get response from Voice in the Fog"
- Backend is not running
- Wrong API base URL
- Network connection issue

### "Received empty response from Voice in the Fog"
- Backend returned empty `response` field
- Backend doesn't have data for this player
- Backend doesn't support this topic yet

### "Request failed with status code 404"
- Wrong API endpoint
- Backend route not configured
- Check endpoint mapping in voiceInFogService.ts

### "Request failed with status code 500"
- Backend internal error
- Check backend server logs
- Backend might be missing dependencies

## Expected API Endpoints

For each feature context:

| Feature | Endpoint | Example |
|---------|----------|---------|
| Echoes | `/api/voice-in-fog/echoes-of-battle/{puuid}?starter_topic=...` | `Role Influence` |
| Patterns | `/api/voice-in-fog/patterns-beneath-chaos/{puuid}?starter_topic=...` | `Aggression` |
| Faultlines | `/api/voice-in-fog/faultlines-analysis/{puuid}?starter_topic=...` | `Combat Efficiency Index` |

## Quick Fix Checklist

- [ ] Backend server is running on http://localhost:3000
- [ ] `.env` file exists with correct API base URL
- [ ] Dev server restarted after creating .env
- [ ] API endpoint exists on backend
- [ ] Backend returns correct JSON format
- [ ] Backend returns ISO 8601 timestamp
- [ ] CORS is configured on backend
- [ ] Player PUUID is valid
- [ ] Player has data in backend database

## Mock Response for Testing

If backend is not ready, you can temporarily mock the response in voiceInFogService.ts:

```typescript
async sendStarterTopic(request: StarterTopicRequest): Promise<VoiceInFogResponse> {
  // TEMPORARY: Mock response for testing
  return {
    response: `This is a mock response for "${request.starterTopic}". Your actual backend should return real insights here.`,
    timestamp: new Date().toISOString()
  };
}
```

## Getting Help

If issue persists:
1. Share console logs (🔵, 🌐, 📦, ❌ messages)
2. Share network tab screenshot
3. Share backend logs
4. Share curl response
