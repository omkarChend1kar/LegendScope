import styled from 'styled-components';
import { designTokens } from './designTokens';

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${designTokens.spacing.lg};
  margin-bottom: ${designTokens.spacing.xl};
`;

export const ChartCard = styled.div`
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.95) 0%,
    rgba(15, 23, 42, 0.98) 100%
  );
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: ${designTokens.radius.xl};
  padding: ${designTokens.spacing.xl};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease;
  overflow: hidden;
  
  /* Performance optimization */
  contain: layout style paint;
  transform: translateZ(0);
  
  /* Subtle shine effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(251, 191, 36, 0.03),
      transparent
    );
    transition: left 0.6s ease;
    pointer-events: none;
  }
  
  &:hover {
    border-color: rgba(251, 191, 36, 0.2);
    box-shadow: 
      0 8px 20px -6px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(251, 191, 36, 0.08);
    transform: translateY(-3px) translateZ(0);
    will-change: transform, box-shadow;
    
    &::after {
      left: 100%;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.1s;
    
    &:hover {
      transform: translateZ(0);
    }
    
    &::after {
      display: none;
    }
  }
`;

export const ChartTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.lg};
  color: ${designTokens.colors.primary[400]};
  margin: 0 0 ${designTokens.spacing.lg} 0;
  font-weight: ${designTokens.typography.fontWeight.bold};
  letter-spacing: ${designTokens.typography.letterSpacing.wide};
  text-transform: uppercase;
`;

export const DonutChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  position: relative;
  margin-bottom: ${designTokens.spacing.xl};
`;

export const DonutChart = styled.svg`
  width: 150px;
  height: 150px;
  transform: rotate(-90deg);
`;

export const ChartLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
  margin-top: ${designTokens.spacing.md};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.md};
  font-size: ${designTokens.typography.fontSize.sm};
  padding: ${designTokens.spacing.sm} ${designTokens.spacing.md};
  border-radius: ${designTokens.radius.md};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    background: rgba(251, 191, 36, 0.04);
    transform: translateX(4px);
  }
`;

export const LegendColor = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: ${designTokens.radius.sm};
  background: ${props => props.$color};
  flex-shrink: 0;
  box-shadow: 
    0 2px 8px ${props => props.$color}40,
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  ${LegendItem}:hover & {
    transform: scale(1.1);
    box-shadow: 
      0 4px 12px ${props => props.$color}60,
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
`;

export const LegendLabel = styled.span`
  color: ${designTokens.colors.text.secondary};
  flex: 1;
  font-weight: 500;
  font-size: ${designTokens.typography.fontSize.base};
`;

export const LegendValue = styled.span`
  color: ${designTokens.colors.text.primary};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-size: ${designTokens.typography.fontSize['2xl']};
  min-width: 64px;
  text-align: right;
  letter-spacing: -0.02em;
`;

export const ProgressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
`;

export const ProgressItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${designTokens.spacing.md};
  background: rgba(15, 23, 42, 0.5);
  border-radius: ${designTokens.radius.md};
  border: 1px solid transparent;
  transition: all ${designTokens.transitions.normal};
  
  &:hover {
    background: rgba(15, 23, 42, 0.7);
    border-color: ${designTokens.colors.border.hover};
    transform: translateX(${designTokens.spacing.xs});
  }
`;

export const ProgressLabel = styled.span`
  font-size: ${designTokens.typography.fontSize.sm};
  color: ${designTokens.colors.text.tertiary};
  font-weight: ${designTokens.typography.fontWeight.medium};
`;

export const ProgressChange = styled.span<{ $positive: boolean }>`
  font-size: ${designTokens.typography.fontSize.base};
  color: ${props => props.$positive ? designTokens.colors.status.success : designTokens.colors.status.error};
  font-weight: ${designTokens.typography.fontWeight.bold};
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.xs};
  font-variant-numeric: tabular-nums;
`;

// Progress Snapshot Styles
export const ProgressCard = styled.div`
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.95) 0%,
    rgba(15, 23, 42, 0.98) 100%
  );
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: ${designTokens.radius.xl};
  padding: ${designTokens.spacing.xl};
  margin-bottom: ${designTokens.spacing['3xl']};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease;
  overflow: hidden;
  
  /* Performance optimization */
  contain: layout style paint;
  transform: translateZ(0);

  /* Amber accent top border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${designTokens.colors.primary[400]} 0%,
      ${designTokens.colors.primary[500]} 100%
    );
  }
  
  &:hover {
    border-color: rgba(251, 191, 36, 0.2);
    transform: translateY(-3px) translateZ(0);
    box-shadow: 
      0 8px 20px -6px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(251, 191, 36, 0.08);
    will-change: transform, box-shadow;
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.1s;
    
    &:hover {
      transform: translateZ(0);
    }
  }
`;

export const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.lg};
  margin-bottom: ${designTokens.spacing.xl};
`;

export const ProgressIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${designTokens.radius.lg};
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.15) 0%,
    rgba(251, 191, 36, 0.08) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 12px rgba(251, 191, 36, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  
  ${ProgressCard}:hover & {
    transform: scale(1.05);
    box-shadow: 
      0 6px 16px rgba(251, 191, 36, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
`;

export const ProgressTitleWrapper = styled.div`
  flex: 1;
`;

export const ProgressSubtitle = styled.p`
  font-size: ${designTokens.typography.fontSize.sm};
  color: ${designTokens.colors.text.muted};
  margin: ${designTokens.spacing.xs} 0 0 0;
  font-weight: ${designTokens.typography.fontWeight.medium};
  opacity: 0.85;
`;

export const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${designTokens.spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Role Distribution Styles (with visual bars)
export const RoleSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${designTokens.spacing.lg};
  margin-bottom: ${designTokens.spacing.xl};
  padding: ${designTokens.spacing.lg};
  background: rgba(251, 191, 36, 0.04);
  border-radius: ${designTokens.radius.lg};
  border: 1px solid rgba(251, 191, 36, 0.1);
`;

export const RoleStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.xs};
  align-items: center;
  text-align: center;
`;

export const SummaryLabel = styled.span`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${designTokens.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: ${designTokens.typography.fontWeight.semibold};
`;

export const SummaryValue = styled.span<{ $highlight?: boolean }>`
  font-size: ${designTokens.typography.fontSize['2xl']};
  color: ${props => props.$highlight ? designTokens.colors.primary[300] : designTokens.colors.text.primary};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
`;

export const RoleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
`;

export const RoleItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.sm};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    transform: translateX(4px);
  }
`;

export const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RoleLabel = styled.span`
  color: ${designTokens.colors.text.secondary};
  font-weight: ${designTokens.typography.fontWeight.semibold};
  font-size: ${designTokens.typography.fontSize.base};
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.xs};
  
  /* Add role badge */
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: ${designTokens.radius.full};
    background: ${designTokens.colors.primary[400]};
    box-shadow: 0 0 8px ${designTokens.colors.primary[400]}80;
  }
`;

export const RoleValue = styled.span<{ $isHigh: boolean }>`
  color: ${props => props.$isHigh ? designTokens.colors.status.success : designTokens.colors.text.primary};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-size: ${designTokens.typography.fontSize['2xl']};
  min-width: 64px;
  text-align: right;
  letter-spacing: -0.02em;
`;

export const RoleBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background: ${designTokens.colors.background.primary};
  border-radius: ${designTokens.radius.full};
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const RoleBar = styled.div<{ $width: number; $isHigh: boolean }>`
  height: 100%;
  width: ${props => props.$width}%;
  background: ${props => props.$isHigh 
    ? `linear-gradient(90deg, ${designTokens.colors.status.success}, #16a34a)`
    : `linear-gradient(90deg, ${designTokens.colors.primary[400]}, ${designTokens.colors.primary[500]})`
  };
  border-radius: ${designTokens.radius.full};
  transition: width ${designTokens.transitions.slow} ${designTokens.transitions.easing.easeOut};
  box-shadow: ${props => props.$isHigh ? designTokens.shadows.glow : 'none'};
  
  /* Gestalt: Continuity - smooth visual flow */
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: ${designTokens.radius.full};
  }
`;
