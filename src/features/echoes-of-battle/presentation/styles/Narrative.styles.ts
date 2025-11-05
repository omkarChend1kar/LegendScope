import styled from 'styled-components';
import { designTokens } from './designTokens';

export const NarrativeSection = styled.div`
  position: relative;
  background: 
    linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%),
    radial-gradient(circle at 50% 0%, rgba(251, 191, 36, 0.05) 0%, transparent 70%);
  border: 1px solid rgba(148, 163, 184, 0.08);
  border-radius: ${designTokens.radius.xl};
  padding: ${designTokens.spacing['3xl']} ${designTokens.spacing.xl};
  text-align: center;
  margin: ${designTokens.spacing['3xl']} 0;
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
  overflow: hidden;
  
  /* Performance optimization */
  will-change: transform, opacity;
  transform: translateZ(0);
  
  @keyframes fadeIn {
    from { 
      opacity: 0;
      transform: translateY(20px) translateZ(0);
    }
    to { 
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    animation: fadeInSimple 0.3s ease both;
    
    @keyframes fadeInSimple {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  }
  
  @media (max-width: 768px) {
    padding: ${designTokens.spacing.xl} ${designTokens.spacing.lg};
  }
`;

export const NarrativeText = styled.p`
  font-size: ${designTokens.typography.fontSize.xl};
  color: ${designTokens.colors.text.secondary};
  line-height: ${designTokens.typography.lineHeight.relaxed};
  margin: 0 auto ${designTokens.spacing.xl};
  max-width: 820px;
  position: relative;
  z-index: 1;
  font-weight: 400;
  letter-spacing: 0.01em;
  opacity: 0.95;
  
  @media (max-width: 768px) {
    font-size: ${designTokens.typography.fontSize.lg};
  }
`;

export const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${designTokens.spacing.sm};
  padding: ${designTokens.spacing.lg} ${designTokens.spacing['2xl']};
  background: linear-gradient(
    135deg,
    ${designTokens.colors.primary[400]} 0%,
    ${designTokens.colors.primary[500]} 100%
  );
  color: ${designTokens.colors.background.primary};
  border: none;
  border-radius: ${designTokens.radius.lg};
  font-size: ${designTokens.typography.fontSize.base};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  overflow: hidden;
  box-shadow: 
    0 8px 24px rgba(251, 191, 36, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  /* Performance optimization */
  transform: translateZ(0);
  
  /* Shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.02) translateZ(0);
    box-shadow: 
      0 16px 40px rgba(251, 191, 36, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    will-change: transform, box-shadow;
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(1.01) translateZ(0);
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.1s;
    
    &:hover {
      transform: none;
    }
    
    &::before {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: ${designTokens.spacing.xl} ${designTokens.spacing.xl};
  }
  
  svg {
    transition: transform ${designTokens.transitions.fast};
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
  
  &:focus-visible {
    outline: 2px solid ${designTokens.colors.primary[300]};
    outline-offset: 4px;
  }
`;
