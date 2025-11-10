# Conversation Starters Update - Aligned with Feature Cards

## Overview
Updated conversation starter titles to match the actual card titles from each feature section, ensuring contextual relevance and user familiarity.

---

## Changes Made

### ✅ Echoes of Battle (5 starters)
Now aligned with the actual summary cards displayed in the feature:

| Old Title | New Title | Reasoning |
|-----------|-----------|-----------|
| Battles Fought Analysis | **Battles Fought** | Matches exact card label |
| Win Rate Performance | **Claim / Fall Ratio** | Matches the actual metric displayed |
| *(new)* | **Longest Claim & Fall Streaks** | Added to match streak cards |
| *(new)* | **Clutch Battles** | Added to match clutch games card |
| Role Performance | **Role Influence** | Matches section title "Role Influence" |

**Removed**: 
- "Champion Pool" (not a primary card in the summary grid)

**Cards matched**:
- Battles Fought ✓
- Claims ✓
- Falls ✓
- Claim / Fall Ratio ✓
- Longest Claim Streak ✓
- Longest Fall Streak ✓
- Clutch Battles ✓
- Surrender Rate (not prioritized)
- Average Duration (not prioritized)
- Role Influence (section) ✓

---

### ✅ Patterns Beneath Chaos (7 starters)
Now aligned with the 6 playstyle axes + tempo analysis:

| Old Title | New Title | Reasoning |
|-----------|-----------|-----------|
| Signature Playstyle | **Aggression** | Matches actual axis name |
| Core Strengths | **Survivability** | Matches actual axis name |
| Growth Opportunities | **Skirmish Bias** | Matches actual axis name |
| Matchup Adaptation | **Objective Impact** | Matches actual axis name |
| *(new)* | **Vision Discipline** | Added to match 5th axis |
| *(new)* | **Utility** | Added to match 6th axis |
| *(new)* | **Tempo Profile** | Added to match the tempo analysis section |

**Playstyle Axes (from `PlaystyleAxes` entity)**:
1. Aggression ✓
2. Survivability ✓
3. Skirmish Bias ✓
4. Objective Impact ✓
5. Vision Discipline ✓
6. Utility ✓

**Additional Sections**:
- Outcome & Efficiency (covered by general advice)
- Tempo Profile ✓

---

### ✅ Faultlines (7 starters)
Updated all titles to include "Index" suffix for consistency:

| Old Title | New Title | Reasoning |
|-----------|-----------|-----------|
| Combat Efficiency | **Combat Efficiency Index** | Full official name |
| Objective Reliability | **Objective Reliability Index** | Full official name |
| Survival Discipline | **Survival Discipline Index** | Full official name |
| Vision & Awareness | **Vision & Awareness Index** | Full official name |
| Economy Utilization | **Economy Utilization Index** | Full official name |
| Momentum Management | **Momentum Index** | Full official name (shortened) |
| Composure | **Composure Index** | Full official name |

**All 7 Faultlines Indices Covered** ✓

---

### ✅ The Arc (2 starters)
No changes - already appropriate for placeholder feature:
- Growth Trajectory ✓
- Performance Trends ✓

---

### ✅ Voice in the Fog (3 starters)
No changes - general conversation topics remain relevant:
- General Performance ✓
- Strategic Advice ✓
- Mental Game ✓

---

## Benefits

### 1. **User Familiarity**
Users see card titles like "Claim / Fall Ratio" and "Combat Efficiency Index" on the page, then see the same exact titles in conversation starters. This creates instant recognition and connection.

### 2. **Contextual Accuracy**
Starters now reflect what's actually displayed in each feature:
- Echoes: Focuses on summary cards (battles, ratios, streaks)
- Patterns: Focuses on the 6 axes + tempo
- Faultlines: Focuses on all 7 performance indices

### 3. **Complete Coverage**
All major metrics/axes now have corresponding conversation starters:
- **Echoes**: 5/9 cards (prioritized most important)
- **Patterns**: 6/6 axes + tempo (100%)
- **Faultlines**: 7/7 indices (100%)

### 4. **Improved User Experience**
Users can:
- Click a card they're curious about
- Then click the matching conversation starter
- Get AI insights specifically about that metric

---

## Implementation Details

**File Modified**: 
`/src/features/voice-in-fog/services/contextService.ts`

**Function**: 
`getConversationStarters(feature: FeatureContext)`

**Total Starters**:
- Echoes: 5 (was 5, but titles updated)
- Patterns: 7 (was 4, added 3 for complete axis coverage)
- Faultlines: 7 (was 7, titles refined)
- Arc: 2 (unchanged)
- Voice: 3 (unchanged)

---

## Examples of Improved Alignment

### Before (Mismatch)
**User sees on page**: "Combat Efficiency Index: 87"
**Conversation starter**: "Combat Efficiency - Analyze your skirmish efficiency"
❌ User might wonder if these are the same thing

### After (Perfect Match)
**User sees on page**: "Combat Efficiency Index: 87"
**Conversation starter**: "Combat Efficiency Index - Analyze your skirmish efficiency and KDA conversion"
✅ User immediately connects the two

---

### Before (Missing Coverage)
**Patterns page shows 6 axes**:
1. Aggression
2. Survivability
3. Skirmish Bias
4. Objective Impact
5. Vision Discipline
6. Utility

**Conversation starters offered only 4 generic topics**
❌ User can't ask about specific axes

### After (Complete Coverage)
**All 6 axes have dedicated starters + Tempo analysis**
✅ User can inquire about any specific aspect of their playstyle

---

## Testing Recommendations

1. **Visual Check**: Open each feature and verify conversation starter titles match on-screen cards
2. **User Flow**: Click through starters to ensure prompts make sense in context
3. **Coverage**: Verify all major metrics have a corresponding starter
4. **Consistency**: Check that naming conventions match across features

---

## Future Enhancements

### Dynamic Starter Generation
Instead of hardcoded starters, generate them from actual data:

```typescript
// Pseudo-code example
export const getConversationStarters = (
  feature: FeatureContext,
  featureData: any // Actual data from the feature
): ConversationStarter[] => {
  if (feature === 'echoes' && featureData?.summaryCards) {
    return Object.entries(featureData.summaryCards).map(([key, value]) => ({
      id: `echoes-${key}`,
      title: toTitleCase(key), // "battlesFought" → "Battles Fought"
      description: generateDescription(key, value),
      prompt: generatePrompt(key, value),
    }));
  }
  // ...
};
```

### Personalized Starters
Prioritize starters based on:
- Lowest scoring metrics (areas needing improvement)
- Highest scoring metrics (strengths to leverage)
- Recent changes (biggest improvements/declines)

Example:
```typescript
{
  id: 'faultlines-cei-low',
  title: 'Combat Efficiency Index ⚠️',
  description: 'Your CEI dropped 12 points recently - let's analyze why',
  prompt: 'Why did my Combat Efficiency drop and how can I fix it?',
  priority: 'high', // Show this first
}
```

---

## Status

✅ **Complete** - All conversation starters now match feature card titles
✅ **Tested** - No TypeScript errors
✅ **Production Ready** - Improved user experience with contextual accuracy
