export const theme = {
  colors: {
    // Cinematic Deep Indigo & Ethereal Gold Palette
    primary: {
      gold: '#C8AA6E',           // Pale gold
      lightGold: '#F0E6D2',      // Ethereal gold
      darkGold: '#8B7355',       // Muted gold
      arcaneGold: '#E8D5A3',     // Mystical gold for highlights
    },
    
    // Deep Indigo & Smoky Gray Foundation
    secondary: {
      deepIndigo: '#1a1b3a',     // Deep indigo background
      smokyGray: '#2d2e3f',      // Smoky gray layers  
      darkBlue: '#0F1419',       // Deepest blue-black
      navy: '#1C1E2B',           // Mist navy
      indigoMist: '#252647',     // Indigo with mist
    },
    
    // Ethereal & Mystical Accents
    accent: {
      arcaneBlue: '#4A90E2',     // Arcane blue highlights
      ethereal: '#6B73FF',       // Ethereal blue-purple
      mist: '#8892B0',           // Mist color for subtle elements
      whisper: '#A0A8CC',        // Whisper gray-blue
    },
    
    // Narrative Neutral Tones
    neutral: {
      white: '#F8FAFC',          // Soft white
      lightGray: '#CBD2E0',      // Light narrative gray
      gray: '#64748B',           // Story gray
      darkGray: '#334155',       // Deep story gray
      black: '#0F172A',          // Narrative black
    },
    
    // Emotional Status Colors
    status: {
      triumph: '#10B981',        // Victory green
      challenge: '#F59E0B',      // Growth opportunity amber
      struggle: '#EF4444',       // Area to illuminate red
      wisdom: '#3B82F6',         // Insight blue
    },
    
    // Cinematic Background Gradients
    gradients: {
      primary: 'linear-gradient(135deg, #0F172A 0%, #1a1b3a 35%, #252647 70%, #1C1E2B 100%)',
      secondary: 'linear-gradient(135deg, #1a1b3a 0%, #252647 50%, #2d2e3f 100%)',
      gold: 'linear-gradient(135deg, #8B7355 0%, #C8AA6E 50%, #E8D5A3 100%)',
      card: 'linear-gradient(145deg, rgba(29, 30, 58, 0.4) 0%, rgba(37, 38, 71, 0.6) 100%)',
      mist: 'linear-gradient(180deg, rgba(200, 170, 110, 0.05) 0%, transparent 100%)',
      ethereal: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(107, 115, 255, 0.05) 100%)',
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
      serif: "'Cinzel', 'Georgia', serif", // Cinematic serif for narrative headers
      narrative: "'Playfair Display', serif", // Alternative narrative serif
      sans: "'Inter', 'Helvetica Neue', sans-serif", // Clean sans for body text
      condensed: "'Inter Tight', sans-serif", // Narrow sans for stats
      mono: "'JetBrains Mono', 'Courier New', monospace", // For code and precise data
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
    // Subtle depth shadows
    sm: '0 2px 4px rgba(15, 23, 42, 0.08)',
    md: '0 4px 12px rgba(15, 23, 42, 0.12)',
    lg: '0 8px 24px rgba(15, 23, 42, 0.16)',
    xl: '0 12px 32px rgba(15, 23, 42, 0.20)',
    
    // Cinematic glows
    glow: '0 0 24px rgba(200, 170, 110, 0.3)', // Ethereal gold glow
    goldGlow: '0 0 32px rgba(232, 213, 163, 0.4)', // Arcane gold glow
    blueGlow: '0 0 28px rgba(74, 144, 226, 0.3)', // Mystical blue glow
    mistGlow: '0 0 40px rgba(136, 146, 176, 0.2)', // Soft mist glow
    
    // Narrative depth
    whisper: '0 0 16px rgba(160, 168, 204, 0.15)', // Subtle whisper shadow
    echo: '0 4px 20px rgba(26, 27, 58, 0.4)', // Echo depth shadow
    memory: 'inset 0 1px 0 rgba(248, 250, 252, 0.05)', // Memory highlight
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
      whisper: '100ms ease-out', // Micro-interactions
      normal: '300ms ease-in-out', // Standard transitions  
      reveal: '600ms ease-out', // Section reveals
      drift: '800ms ease-in-out', // Floating elements
      ethereal: '1200ms ease-in-out', // Mystical animations
    },
    
    // Cinematic timing curves
    curves: {
      entrance: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Entrance bounce
      exit: 'cubic-bezier(0.32, 0, 0.67, 0)', // Quick exit
      float: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Floating motion
      memory: 'cubic-bezier(0.23, 1, 0.32, 1)', // Memory fade
    },
    
    // Gesture principles
    gestalt: {
      closure: '400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Incomplete reveal
      continuity: '600ms cubic-bezier(0.23, 1, 0.32, 1)', // Flow between elements
      proximity: '200ms ease-out', // Related elements grouping
    },
  },
} as const;

export type Theme = typeof theme;