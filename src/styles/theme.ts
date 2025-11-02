export const theme = {
  colors: {
    // Primary League of Legends colors
    primary: {
      gold: '#C8AA6E',
      lightGold: '#F0E6D2',
      darkGold: '#8B7355',
    },
    
    // Blue tones inspired by League's mystical elements
    secondary: {
      blue: '#0596AA',
      lightBlue: '#5BC0DE',
      darkBlue: '#0F2027',
      navy: '#1E232A',
    },
    
    // Purple/Mystical tones
    accent: {
      purple: '#9D4EDD',
      lightPurple: '#C77DFF',
      darkPurple: '#5A189A',
      magenta: '#C724B1',
    },
    
    // Neutral tones
    neutral: {
      white: '#FFFFFF',
      lightGray: '#A09B8C',
      gray: '#5A5A5A',
      darkGray: '#3C3C41',
      black: '#0F0F0F',
    },
    
    // Status colors
    status: {
      success: '#00B74A',
      warning: '#F57C00',
      error: '#F44336',
      info: '#2196F3',
    },
    
    // Background gradients
    gradients: {
      primary: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
      secondary: 'linear-gradient(135deg, #5A189A 0%, #9D4EDD 50%, #C77DFF 100%)',
      gold: 'linear-gradient(135deg, #8B7355 0%, #C8AA6E 50%, #F0E6D2 100%)',
      card: 'linear-gradient(145deg, #1E232A 0%, #2C323A 100%)',
    },
    
    // Champion role colors
    roles: {
      adc: '#FF6B6B',
      support: '#4ECDC4',
      jungle: '#45B7D1',
      mid: '#96CEB4',
      top: '#FFEAA7',
    },
  },
  
  typography: {
    fontFamily: {
      primary: "'Cinzel', serif", // Elegant serif for headings
      secondary: "'Inter', sans-serif", // Clean sans-serif for body text
      mono: "'JetBrains Mono', monospace", // For code and stats
    },
    
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },
  
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(200, 170, 110, 0.4)', // Gold glow effect
    goldGlow: '0 0 20px rgba(200, 170, 110, 0.4)', // Gold glow effect
    purpleGlow: '0 0 20px rgba(157, 78, 221, 0.4)', // Purple glow effect
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  animations: {
    transition: {
      fast: '150ms ease-in-out',
      normal: '300ms ease-in-out',
      slow: '500ms ease-in-out',
    },
  },
} as const;

export type Theme = typeof theme;