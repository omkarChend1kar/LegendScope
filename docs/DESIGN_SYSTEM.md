# LegendScope Design System

> A comprehensive design system built on design psychology principles for consistent, accessible, and delightful user experiences.

## Table of Contents
- [Design Principles](#design-principles)
- [Design Tokens](#design-tokens)
- [Component Patterns](#component-patterns)
- [Usage Guidelines](#usage-guidelines)
- [Psychology Behind the Choices](#psychology-behind-the-choices)

---

## Design Principles

Our design system is built on proven design psychology principles:

### 1. **Consistency — The Invisible Glue**
- Token-based design ensures visual consistency across all components
- Predictable patterns reduce cognitive load
- Users build mental models faster

### 2. **Visual Hierarchy — Guiding the Eye**
- Clear focal points using size, color, and contrast
- Important elements stand out through deliberate emphasis
- Layered information with proper spacing and grouping

### 3. **Gestalt Principles**
- **Proximity**: Related elements are grouped together
- **Similarity**: Consistent styling creates pattern recognition
- **Continuity**: Visual flow guides the eye naturally
- **Figure-Ground**: Elevated cards separate from background

### 4. **Aesthetic-Usability Effect**
- Beautiful interfaces are perceived as more usable
- Micro-interactions create delightful moments
- Smooth transitions feel responsive and polished

### 5. **Von Restorff Effect**
- Important CTAs stand out with unique styling
- Glow effects draw attention to primary actions
- Peak moments are made memorable

### 6. **Fitts's Law**
- Larger touch targets on mobile (full-width CTAs)
- Adequate spacing prevents mis-taps
- Interactive elements have clear hover states

---

## Design Tokens

### Spacing Scale
Based on an **8px grid system** for consistent rhythm:

```typescript
xs: '4px'   // 0.5 units - Tight spacing for related elements
sm: '8px'   // 1 unit - Base spacing unit
md: '16px'  // 2 units - Default spacing between components
lg: '24px'  // 3 units - Section spacing
xl: '32px'  // 4 units - Large gaps
2xl: '48px' // 6 units - Major section breaks
3xl: '64px' // 8 units - Page-level spacing
```

**Usage Examples:**
```typescript
// ✅ DO: Use tokens for all spacing
padding: ${designTokens.spacing.md};
gap: ${designTokens.spacing.lg};

// ❌ DON'T: Use arbitrary values
padding: 17px; // Breaks the grid system
```

---

### Colors

#### Primary Brand
```typescript
primary: {
  DEFAULT: '#fbbf24', // Amber 400 - Main brand color
  light: '#fde68a',   // Amber 200 - Hover states
  dark: '#f59e0b',    // Amber 500 - Active states
}
```

#### Backgrounds
```typescript
background: {
  primary: '#020617',   // Slate 950 - Page background
  secondary: '#0f172a', // Slate 900 - Card background
  tertiary: '#1e293b',  // Slate 800 - Elevated elements
}
```

#### Text Colors
```typescript
text: {
  primary: '#f8fafc',   // Slate 50 - Headings
  secondary: '#e2e8f0', // Slate 200 - Body text
  tertiary: '#cbd5e1',  // Slate 300 - De-emphasized text
  muted: '#94a3b8',     // Slate 400 - Captions
  disabled: '#64748b',  // Slate 500 - Disabled states
}
```

#### Semantic Colors
```typescript
status: {
  success: '#22c55e',   // Green 500 - Positive outcomes
  error: '#ef4444',     // Red 500 - Errors, defeats
  warning: '#f59e0b',   // Amber 500 - Warnings
  info: '#3b82f6',      // Blue 500 - Informational
}
```

---

### Typography

#### Font Sizes
```typescript
xs: '12px'   // Captions, labels
sm: '14px'   // Small body text
base: '16px' // Body text (default)
lg: '18px'   // Large body text
xl: '20px'   // Subheadings
2xl: '24px'  // Card titles
3xl: '30px'  // Section headings
4xl: '36px'  // Major headings
5xl: '48px'  // Hero text
6xl: '60px'  // Display text
```

#### Font Weights
```typescript
normal: 400   // Body text
medium: 500   // Emphasized text
semibold: 600 // Subheadings
bold: 700     // Headings
extrabold: 800 // Hero text
```

#### Line Heights
```typescript
tight: 1.2    // Headings
normal: 1.5   // Body text
relaxed: 1.75 // Comfortable reading
```

**Usage:**
```typescript
// ✅ DO: Use consistent typography
font-size: ${designTokens.typography.fontSize['2xl']};
font-weight: ${designTokens.typography.fontWeight.bold};

// ❌ DON'T: Mix arbitrary sizes
font-size: 22px; // Not in the scale
```

---

### Shadows

#### Elevation System
```typescript
sm: '0 1px 2px rgba(0, 0, 0, 0.05)'    // Subtle depth
md: '0 4px 6px rgba(0, 0, 0, 0.1)'     // Cards
lg: '0 10px 15px rgba(0, 0, 0, 0.15)'  // Elevated cards
xl: '0 20px 25px rgba(0, 0, 0, 0.2)'   // Modals
```

#### Brand Glow Effects
```typescript
glow: '0 0 20px rgba(251, 191, 36, 0.3)'        // Ambient glow
glowHover: '0 0 30px rgba(251, 191, 36, 0.5)'   // Hover emphasis
```

**Usage:**
```typescript
// Base state
box-shadow: ${designTokens.shadows.md};

// Hover state with glow
&:hover {
  box-shadow: ${designTokens.shadows.glowHover};
}
```

---

### Border Radius
```typescript
sm: '6px'     // Buttons, pills
md: '12px'    // Cards
lg: '16px'    // Large cards
xl: '24px'    // Hero sections
full: '9999px' // Circles, badges
```

---

### Transitions

#### Duration
```typescript
fast: '150ms'   // Micro-interactions
normal: '300ms' // Standard transitions
slow: '500ms'   // Emphasis animations
```

#### Easing Functions
```typescript
easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)'  // Natural deceleration
easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)' // Smooth both ways
bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' // Playful bounce
```

**Usage:**
```typescript
// Smooth hover transitions
transition: all ${designTokens.transitions.normal} ${designTokens.transitions.easeOut};

// Playful micro-interactions
transition: transform ${designTokens.transitions.fast} ${designTokens.transitions.bounce};
```

---

### Z-Index Scale
```typescript
base: 0       // Default layer
dropdown: 100 // Dropdowns
sticky: 200   // Sticky headers
overlay: 500  // Overlays
modal: 1000   // Modals
toast: 1500   // Notifications/tooltips
```

---

## Component Patterns

### Cards

**Standard Card:**
```typescript
background: ${designTokens.colors.background.secondary};
border-radius: ${designTokens.radius.md};
padding: ${designTokens.spacing.lg};
box-shadow: ${designTokens.shadows.md};
transition: all ${designTokens.transitions.normal} ${designTokens.transitions.easeOut};

&:hover {
  transform: translateY(-4px);
  box-shadow: ${designTokens.shadows.lg};
}
```

**Elevated Card (Figure-Ground):**
```typescript
background: linear-gradient(
  135deg,
  ${designTokens.colors.background.secondary},
  ${designTokens.colors.background.tertiary}
);
border-left: 4px solid ${designTokens.colors.primary.DEFAULT};
box-shadow: ${designTokens.shadows.glow};
```

---

### Buttons

**Primary CTA (Von Restorff Effect):**
```typescript
background: ${designTokens.colors.primary.DEFAULT};
color: ${designTokens.colors.background.primary};
font-weight: ${designTokens.typography.fontWeight.bold};
text-transform: uppercase;
letter-spacing: ${designTokens.typography.letterSpacing.wide};
padding: ${designTokens.spacing.md} ${designTokens.spacing.xl};
border-radius: ${designTokens.radius.sm};
box-shadow: ${designTokens.shadows.glow};
transition: all ${designTokens.transitions.normal} ${designTokens.transitions.easeOut};

&:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: ${designTokens.shadows.glowHover};
}

// Fitts's Law: Full-width on mobile
@media (max-width: 768px) {
  width: 100%;
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
}
```

---

### Icons

**Standard Icon Wrapper:**
```typescript
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
border-radius: ${designTokens.radius.md};
transition: transform ${designTokens.transitions.fast} ${designTokens.transitions.easeOut};

&:hover {
  transform: scale(1.1);
}
```

**Larger Icons (Focal Points):**
```typescript
width: 48px;
height: 48px;
// Enhanced hover for memorability
&:hover {
  transform: scale(1.1) rotate(5deg);
}
```

---

### Lists

**Proximity-Based Grouping:**
```typescript
gap: ${designTokens.spacing.sm}; // Tight for related items

// Individual items
padding: ${designTokens.spacing.md};
border-radius: ${designTokens.radius.md};
transition: all ${designTokens.transitions.normal} ${designTokens.transitions.easeOut};

&:hover {
  background: ${designTokens.colors.background.tertiary};
  border-color: ${designTokens.colors.border.hover};
  transform: translateX(4px);
}
```

---

## Usage Guidelines

### Do's ✅

1. **Always use design tokens**
   ```typescript
   padding: ${designTokens.spacing.md}; // ✅
   ```

2. **Respect the spacing scale**
   - Use xs, sm, md, lg, xl, 2xl, 3xl
   - Stick to 8px increments

3. **Apply consistent hover states**
   ```typescript
   &:hover {
     transform: translateY(-4px);
     box-shadow: ${designTokens.shadows.lg};
   }
   ```

4. **Use semantic colors**
   ```typescript
   color: ${designTokens.colors.status.success}; // For positive metrics
   ```

5. **Add transitions to interactive elements**
   ```typescript
   transition: all ${designTokens.transitions.normal} ${designTokens.transitions.easeOut};
   ```

---

### Don'ts ❌

1. **Don't use arbitrary values**
   ```typescript
   padding: 17px; // ❌ Breaks grid system
   ```

2. **Don't mix color systems**
   ```typescript
   color: #fff; // ❌ Use designTokens.colors.text.primary
   ```

3. **Don't skip hover states**
   ```typescript
   // ❌ Missing interaction feedback
   const Button = styled.button`
     background: blue;
   `;
   ```

4. **Don't use fixed sizes without breakpoints**
   ```typescript
   width: 300px; // ❌ Won't scale on mobile
   ```

5. **Don't forget focus states for accessibility**
   ```typescript
   // ❌ Missing focus indicator
   &:focus {
     outline: none;
   }
   ```

---

## Psychology Behind the Choices

### Consistency (Invisible Glue)
**Why:** Users build mental models through repetition. Consistent spacing, colors, and interactions reduce cognitive load.

**Implementation:**
- All spacing uses 8px grid
- All cards have same border radius (12px)
- All hover states use same transitions (300ms ease-out)

**Impact:** Users learn patterns once and apply everywhere.

---

### Von Restorff Effect (Isolation Effect)
**Why:** Distinctive items are more memorable and noticeable.

**Implementation:**
- Primary CTA has unique glow shadow
- Peak timeline bars have permanent highlight
- Defining match cards have gradient backgrounds

**Impact:** Important actions stand out, key moments are remembered.

---

### Peak-End Rule
**Why:** People remember peaks and endings most vividly.

**Implementation:**
- Hover animations create micro "peak" moments
- CTAs at section ends create memorable endings
- Progress snapshots highlight peak achievements

**Impact:** Positive interactions create lasting impressions.

---

### Fitts's Law
**Why:** Larger, closer targets are easier to hit.

**Implementation:**
- Mobile CTAs are full-width (easier to tap)
- Buttons have minimum 44px height
- Adequate spacing prevents mis-taps

**Impact:** Better mobile usability, fewer errors.

---

### Gestalt Principles

#### Proximity
**Why:** Objects close together are perceived as related.

**Implementation:**
- Statistics grouped with 8px gap
- Section headers tight with content (16px)
- Unrelated sections separated by 48px+

**Impact:** Clear information architecture.

#### Similarity
**Why:** Similar objects are perceived as related.

**Implementation:**
- All stat cards have same styling
- All role distributions use same pattern
- Consistent icon sizes and shapes

**Impact:** Easy pattern recognition.

#### Continuity
**Why:** Elements arranged on a line are perceived as related.

**Implementation:**
- Timeline sparkline creates visual flow
- Progress metrics align in grid
- Navigation follows natural eye path

**Impact:** Smooth visual navigation.

#### Figure-Ground
**Why:** Elevated elements stand out from background.

**Implementation:**
- Cards use shadows for depth
- Gradient backgrounds separate layers
- Border accents create hierarchy

**Impact:** Clear visual layers.

---

### Aesthetic-Usability Effect
**Why:** Beautiful interfaces are perceived as more usable.

**Implementation:**
- Smooth transitions on all interactions
- Subtle hover effects create polish
- Glow effects add "magic" moments

**Impact:** Higher perceived quality and trust.

---

## Migration Guide

### Converting Existing Components

**Before:**
```typescript
const Card = styled.div`
  padding: 1rem;
  background: #0f172a;
  border-radius: 12px;
  margin-bottom: 16px;
`;
```

**After:**
```typescript
import { designTokens } from '../styles/designTokens';

const Card = styled.div`
  padding: ${designTokens.spacing.md};
  background: ${designTokens.colors.background.secondary};
  border-radius: ${designTokens.radius.md};
  margin-bottom: ${designTokens.spacing.md};
  
  // Add transitions for polish
  transition: all ${designTokens.transitions.normal} ${designTokens.transitions.easeOut};
  
  // Add hover state
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${designTokens.shadows.lg};
  }
`;
```

---

## Resources

- [Full Token Reference](/src/features/echoes-of-battle/presentation/styles/designTokens.ts)
- [Component Examples](/src/features/echoes-of-battle/presentation/components/)
- [Style File Examples](/src/features/echoes-of-battle/presentation/styles/)

---

## Questions?

This design system is living documentation. As you implement components, ask:

1. Am I using design tokens for all values?
2. Does this follow the spacing scale?
3. Have I added appropriate hover/focus states?
4. Is this consistent with existing patterns?
5. Does this align with our design principles?

**If unsure, refer to the EchoesOfBattle feature as the reference implementation.**
