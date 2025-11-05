import styled from 'styled-components';
import { designTokens } from './designTokens';

export const DefiningMatchSection = styled.div`
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.95) 0%,
    rgba(15, 23, 42, 0.98) 100%
  );
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-left: 4px solid ${designTokens.colors.primary[400]};
  border-radius: ${designTokens.radius.xl};
  padding: ${designTokens.spacing.xl};
  margin-bottom: ${designTokens.spacing['3xl']};
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.xl};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease;
  
  /* Performance optimization */
  contain: layout style paint;
  transform: translateZ(0);
  
  /* Accent glow */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${designTokens.colors.primary[400]};
    box-shadow: 0 0 16px ${designTokens.colors.primary[400]}80;
    transition: box-shadow 0.3s ease;
  }
  
  &:hover {
    border-color: rgba(251, 191, 36, 0.2);
    transform: translateY(-3px) translateZ(0);
    box-shadow: 
      0 8px 20px -6px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(251, 191, 36, 0.08);
    will-change: transform, box-shadow;
    
    &::before {
      box-shadow: 0 0 24px ${designTokens.colors.primary[400]};
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.1s;
    
    &:hover {
      transform: translateZ(0);
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ChampionIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: ${designTokens.radius.lg};
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.15) 0%,
    rgba(251, 191, 36, 0.08) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  box-shadow: 
    0 4px 12px rgba(251, 191, 36, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: ${designTokens.radius.lg};
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    filter: blur(12px);
  }
  
  svg {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  ${DefiningMatchSection}:hover & {
    transform: scale(1.05) rotate(-5deg);
    box-shadow: 
      0 8px 24px rgba(251, 191, 36, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      transform: scale(1.1);
    }
  }
`;

export const MatchDetails = styled.div`
  flex: 1;
`;

export const MatchTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.xl};
  color: ${designTokens.colors.primary[300]};
  margin: 0 0 ${designTokens.spacing.xs} 0;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const MatchDate = styled.p`
  font-size: ${designTokens.typography.fontSize.sm};
  color: ${designTokens.colors.text.muted};
  margin: 0 0 ${designTokens.spacing.md} 0;
  opacity: 0.8;
`;

export const MatchStats = styled.div`
  display: flex;
  gap: ${designTokens.spacing.xl};
  font-size: ${designTokens.typography.fontSize.sm};
  color: ${designTokens.colors.text.secondary};
  flex-wrap: wrap;
  
  span {
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    
    &:not(:last-child)::after {
      content: '•';
      margin-left: ${designTokens.spacing.xl};
      color: ${designTokens.colors.text.muted};
      opacity: 0.5;
    }
  }
`;
