/**
 * Design System Tokens for Echoes of Battle
 * Following 8px base unit system for consistency
 */

export const designTokens = {
  // Spacing Scale (8px base unit)
  spacing: {
    xs: '0.25rem',   // 4px  - micro spacing
    sm: '0.5rem',    // 8px  - tight spacing
    md: '1rem',      // 16px - default spacing
    lg: '1.5rem',    // 24px - comfortable spacing
    xl: '2rem',      // 32px - section spacing
    '2xl': '3rem',   // 48px - major sections
    '3xl': '4rem',   // 64px - hero sections
  },

  // Border Radius
  radius: {
    sm: '0.375rem',  // 6px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',  // pill shape
  },

  // Shadows (Elevation)
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(251, 191, 36, 0.3)',
    glowHover: '0 0 30px rgba(251, 191, 36, 0.5)',
  },

  // Colors
  colors: {
    // Primary (Amber/Gold)
    primary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',  // Main brand color
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    // Background (Slate)
    background: {
      primary: '#020617',    // slate-950
      secondary: '#0f172a',  // slate-900
      tertiary: '#1e293b',   // slate-800
      elevated: 'rgba(30, 41, 59, 0.5)',
    },
    
    // Text
    text: {
      primary: '#f8fafc',    // slate-50
      secondary: '#e2e8f0',  // slate-200
      tertiary: '#94a3b8',   // slate-400
      muted: '#64748b',      // slate-500
    },
    
    // Status
    status: {
      success: '#4ade80',    // green-400
      error: '#f87171',      // red-400
      warning: '#fbbf24',    // amber-400
      info: '#60a5fa',       // blue-400
    },
    
    // Borders
    border: {
      default: 'rgba(51, 65, 85, 0.5)',     // slate-700 @ 50%
      focus: 'rgba(251, 191, 36, 0.5)',     // amber-400 @ 50%
      hover: 'rgba(251, 191, 36, 0.3)',     // amber-400 @ 30%
    },
  },

  // Typography Scale
  typography: {
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Easing functions
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Z-index Scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  // Animation Variants
  animations: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    },
    
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
    },
    
    fadeInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
    },
    
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3 },
    },
    
    slideInRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4 },
    },
  },

  // Interactive States
  interactions: {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
    
    focus: {
      boxShadow: '0 0 0 3px rgba(251, 191, 36, 0.3)',
    },
  },
};

// Utility function to get staggered animation delays
export const getStaggerDelay = (index: number, baseDelay: number = 0.05): number => {
  return index * baseDelay;
};

// Utility function to calculate responsive spacing
export const getResponsiveSpacing = (mobile: string, tablet: string, desktop: string) => ({
  base: mobile,
  md: tablet,
  lg: desktop,
});
