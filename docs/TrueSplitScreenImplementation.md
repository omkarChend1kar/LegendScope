# True Split-Screen Chat Implementation

## Overview
Implemented a VS Code-style true split-screen layout where the chat panel pushes the entire Journey Dashboard content to the left, rather than overlaying it.

## Architecture

### Layout Structure
```
SplitScreenContainer (flex container, 100vw x 100vh)
├── MobileBackdrop (mobile only overlay)
├── MainContent (flex: 1, contains entire dashboard)
│   └── MainLayout
│       ├── Sidebar
│       ├── TopBar
│       └── PageContainer
└── ChatPanel (fixed width: 480px/520px, flex-shrink: 0)
    └── SplitScreenChat
```

## Key Changes

### 1. JourneyDashboard.tsx
**Root Layout Container**
- Created `SplitScreenContainer` as flex container (`display: flex`)
- Wraps both MainContent and ChatPanel as flex siblings
- Full viewport dimensions (100vw x 100vh)

**MainContent Wrapper**
- `flex: 1` to take available space
- Shrinks when chat opens (pushed left by ChatPanel)
- Contains the entire MainLayout with sidebar and content

**ChatPanel Container**
- Fixed width: 480px (desktop), 520px (large screens)
- `flex-shrink: 0` prevents compression
- Animates width from 0 → 480px on open
- On mobile (<1024px): Position fixed overlay instead of split

**Auto-Collapse Sidebar**
- When chat opens, automatically collapses sidebar to 80px
- Creates more space for content when split-screen is active
- Controlled via `handleChatToggle` function

### 2. MainLayout.tsx
**Removed Chat Width Prop**
- No longer needed since layout is controlled by flex container
- Simplified to only handle sidebar collapsed state
- Layout naturally responds to parent container size

### 3. SplitScreenChat.styles.ts
**Removed Fixed Positioning**
- Changed from `position: fixed` to document flow
- Now fills parent ChatPanel container (100% width/height)
- Container handles width animations and transitions
- No longer needs responsive width calculations

### 4. Sidebar.tsx
**External Collapse Control**
- Added props: `collapsed?: boolean` and `onCollapsedChange?: (boolean) => void`
- Allows parent (JourneyDashboard) to control collapsed state
- Falls back to internal state if not controlled externally
- Used for auto-collapse when chat opens

## Behavior

### Desktop (>1024px)
1. **Chat Closed**: Content spans full width
2. **Chat Opens**: 
   - ChatPanel width animates 0 → 480px
   - Sidebar auto-collapses (288px → 80px)
   - MainContent shrinks proportionally (pushed left)
   - Smooth transition: `0.4s cubic-bezier(0.4, 0, 0.2, 1)`

### Mobile (≤1024px)
1. **Chat Closed**: Content spans full width
2. **Chat Opens**:
   - ChatPanel becomes fixed overlay (z-index: 1000)
   - MobileBackdrop appears with blur
   - Tap backdrop to close chat
   - Content remains full width underneath

## Animations

### Width Transition
```css
transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```
- Smooth easing for natural feel
- Matches VS Code's panel animations

### Sidebar Collapse
```css
transition: width 0.3s ease;
```
- Slightly faster than chat panel
- Coordinated but independent timing

## Space Management

### Layout Calculation (Desktop)
- **Available Width**: 100vw
- **Sidebar Width**: 288px (expanded) / 80px (collapsed)
- **Chat Width**: 480px (standard) / 520px (large screens)
- **Content Width**: Remaining flex space

**Example (1920px screen, chat open):**
- Sidebar: 80px
- Content: 1360px (flex: 1)
- Chat: 480px
- **Total**: 1920px ✓

### Responsive Breakpoints
```css
/* Standard desktop */
@media (min-width: 1025px) {
  chat-width: 480px
}

/* Large desktop */
@media (min-width: 1400px) {
  chat-width: 520px
}

/* Mobile/Tablet */
@media (max-width: 1024px) {
  chat: fixed overlay 100%
}
```

## User Experience

### Floating Button
- Position: `fixed` bottom-right (24px margins)
- Hidden on Voice in the Fog page
- Glowing gradient animation (pulse effect)
- Opens chat with auto-sidebar-collapse

### Context Awareness
- Chat shows feature-specific conversation starters
- Starters update when switching features
- Maintains chat history during feature navigation

### Accessibility
- Keyboard support (Esc to close)
- ARIA labels on buttons
- Focus management
- Mobile backdrop for touch interactions

## Technical Notes

### Why This Approach?
1. **True Split**: Content actually resizes, not just covered
2. **Flex Layout**: Natural, responsive, CSS-only
3. **Performance**: Hardware-accelerated width transitions
4. **Maintainable**: Clear component hierarchy

### Comparison to Overlay Approach
| Aspect | Overlay | Split-Screen |
|--------|---------|--------------|
| Content visible | Partially hidden | Fully visible |
| Layout reflow | None | Yes |
| User perception | Popup/modal | Integrated panel |
| Scroll behavior | Independent | Synchronized |
| Space efficiency | Lower | Higher |

### Future Enhancements
- [ ] Resize handle (drag to adjust chat width)
- [ ] Remember width preference (localStorage)
- [ ] Minimize to pill at bottom
- [ ] Keyboard shortcut (Cmd+Shift+V)
- [ ] Picture-in-picture mode

## Testing Checklist
- [x] Chat opens with smooth animation
- [x] Sidebar auto-collapses on chat open
- [x] Content pushes left (not covered)
- [x] Floating button triggers correctly
- [x] Mobile backdrop works on touch
- [x] No layout shift or overflow
- [x] Conversation starters load
- [x] Feature context switches properly
- [ ] Test on various screen sizes
- [ ] Test with long content (scrolling)
- [ ] Test rapid open/close

## Files Modified
1. `/src/pages/JourneyDashboard.tsx` - Root layout restructure
2. `/src/components/layout/MainLayout.tsx` - Removed chat width prop
3. `/src/components/navigation/Sidebar.tsx` - External collapse control
4. `/src/features/voice-in-fog/components/SplitScreenChat.styles.ts` - Document flow styles
