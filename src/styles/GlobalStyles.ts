import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.secondary};
    background: ${theme.colors.gradients.primary};
    color: ${theme.colors.neutral.lightGray};
    line-height: ${theme.typography.lineHeight.normal};
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.secondary.darkBlue};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      ${theme.colors.primary.gold} 0%,
      ${theme.colors.primary.darkGold} 100%
    );
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      180deg,
      ${theme.colors.primary.lightGold} 0%,
      ${theme.colors.primary.gold} 100%
    );
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fontFamily.primary};
    color: ${theme.colors.primary.lightGold};
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: ${theme.typography.lineHeight.tight};
  }

  h1 {
    font-size: ${theme.typography.fontSize['5xl']};
    margin-bottom: ${theme.spacing.lg};
  }

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing.md};
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.sm};
  }

  h4 {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    margin-bottom: ${theme.spacing.sm};
  }

  a {
    color: ${theme.colors.primary.gold};
    text-decoration: none;
    transition: color ${theme.animations.transition.fast};
    
    &:hover {
      color: ${theme.colors.primary.lightGold};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
    border: none;
  }

  /* Selection styling */
  ::selection {
    background: ${theme.colors.primary.gold};
    color: ${theme.colors.secondary.darkBlue};
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid ${theme.colors.primary.gold};
    outline-offset: 2px;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px ${theme.colors.primary.gold}40;
    }
    50% {
      box-shadow: 0 0 30px ${theme.colors.primary.gold}80;
    }
  }

  @keyframes purpleGlow {
    0%, 100% {
      box-shadow: 0 0 20px ${theme.colors.accent.purple}40;
    }
    50% {
      box-shadow: 0 0 30px ${theme.colors.accent.purple}80;
    }
  }

  /* Utility classes */
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }

  .animate-slideInLeft {
    animation: slideInFromLeft 0.6s ease-out;
  }

  .animate-slideInRight {
    animation: slideInFromRight 0.6s ease-out;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .animate-purpleGlow {
    animation: purpleGlow 2s ease-in-out infinite;
  }

  /* Responsive utilities */
  @media (max-width: ${theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }
    
    h1 {
      font-size: ${theme.typography.fontSize['3xl']};
    }
    
    h2 {
      font-size: ${theme.typography.fontSize['2xl']};
    }
    
    h3 {
      font-size: ${theme.typography.fontSize.xl};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    html {
      font-size: 13px;
    }
  }
`;