import styled from 'styled-components';
import { designTokens } from './designTokens';

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${designTokens.spacing.lg};
  margin-bottom: ${designTokens.spacing['3xl']};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: ${designTokens.spacing.md};
  }
`;

export const StatCard = styled.div<{ $delay: number }>`
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.95) 0%,
    rgba(15, 23, 42, 0.98) 100%
  );
  border: 1px solid rgba(148, 163, 184, 0.08);
  border-radius: ${designTokens.radius.xl};
  padding: ${designTokens.spacing.xl};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease;
  animation: fadeInUp 0.4s ease-out ${props => props.$delay * 0.05}s both;
  overflow: hidden;
  
  /* Performance optimization */
  contain: layout style paint;
  transform: translateZ(0);
  
  /* Subtle gradient border on hover */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${designTokens.radius.xl};
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(251, 191, 36, 0.1),
      transparent
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px) translateZ(0);
    }
    to {
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }
  }
  
  &:hover {
    border-color: rgba(251, 191, 36, 0.2);
    transform: translateY(-4px) translateZ(0);
    box-shadow: 
      0 8px 16px -6px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(251, 191, 36, 0.1);
    will-change: transform, box-shadow;
    
    &::before {
      opacity: 1;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    animation: fadeIn 0.2s ease both;
    transition-duration: 0.1s;
    
    &:hover {
      transform: translateZ(0);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  }
`;

export const StatIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${designTokens.radius.lg};
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.12) 0%,
    rgba(251, 191, 36, 0.06) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${designTokens.spacing.lg};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  
  ${StatCard}:hover & {
    background: linear-gradient(
      135deg,
      rgba(251, 191, 36, 0.18) 0%,
      rgba(251, 191, 36, 0.10) 100%
    );
    transform: scale(1.05);
  }
`;

export const StatValue = styled.div`
  font-size: ${designTokens.typography.fontSize['3xl']};
  font-weight: 700;
  color: ${designTokens.colors.text.primary};
  line-height: 1;
  margin-bottom: ${designTokens.spacing.sm};
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
`;

export const StatLabel = styled.div`
  font-size: ${designTokens.typography.fontSize.sm};
  color: ${designTokens.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: ${designTokens.typography.fontWeight.semibold};
  opacity: 0.85;
`;

export const StatTrend = styled.div`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${designTokens.colors.text.muted};
  margin-top: ${designTokens.spacing.sm};
  font-style: normal;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  
  ${StatCard}:hover & {
    opacity: 1;
  }
`;
