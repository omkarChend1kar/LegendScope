import styled from 'styled-components';
import { designTokens } from './designTokens';

export const TimelineSection = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.95) 0%,
    rgba(15, 23, 42, 0.98) 100%
  );
  border: 1px solid ${designTokens.colors.border.default};
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing.lg};
  transition: all ${designTokens.transitions.normal};
  
  &:hover {
    border-color: ${designTokens.colors.border.hover};
    box-shadow: ${designTokens.shadows.md};
  }
`;

export const TimelineTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.base};
  color: ${designTokens.colors.primary[400]};
  text-transform: uppercase;
  letter-spacing: ${designTokens.typography.letterSpacing.wide};
  margin: 0 0 ${designTokens.spacing.xs} 0;
  font-weight: ${designTokens.typography.fontWeight.bold};
`;

export const TimelineSubtitle = styled.p`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${designTokens.colors.text.tertiary};
  margin: 0 0 ${designTokens.spacing.lg} 0;
  opacity: 0.8;
`;

export const ChartContainer = styled.div`
  position: relative;
  padding: ${designTokens.spacing.xl} ${designTokens.spacing.xl} ${designTokens.spacing.lg} 100px;
  background: rgba(15, 23, 42, 0.4);
  border-radius: ${designTokens.radius.lg};
  margin-bottom: ${designTokens.spacing.lg};
`;

export const YAxisLabel = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%) translateX(0) rotate(-90deg);
  transform-origin: center center;
  font-size: 10px;
  color: ${designTokens.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: ${designTokens.typography.fontWeight.semibold};
  white-space: nowrap;
  width: fit-content;
`;

export const YAxis = styled.div`
  position: absolute;
  left: 60px;
  top: ${designTokens.spacing.xl};
  bottom: ${designTokens.spacing['2xl']};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: ${designTokens.spacing.md};
  border-right: 1px solid rgba(148, 163, 184, 0.3);
`;

export const YAxisTick = styled.div`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${designTokens.colors.text.muted};
  font-variant-numeric: tabular-nums;
  opacity: 0.8;
  min-width: 24px;
  text-align: right;
  font-weight: ${designTokens.typography.fontWeight.medium};
`;

export const GridLines = styled.div`
  position: absolute;
  left: 100px;
  right: ${designTokens.spacing.xl};
  top: ${designTokens.spacing.xl};
  bottom: ${designTokens.spacing['2xl']};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const GridLine = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(148, 163, 184, 0.1);
`;

export const SparklineContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 200px;
  padding: 0;
  position: absolute;
  left: 100px;
  right: ${designTokens.spacing.xl};
  top: ${designTokens.spacing.xl};
`;

export const XAxis = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${designTokens.spacing.sm} 0 0;
  margin-left: 100px;
  margin-right: ${designTokens.spacing.xl};
  border-top: 1px solid rgba(148, 163, 184, 0.3);
`;

export const XAxisLabel = styled.div`
  flex: 1;
  text-align: center;
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${designTokens.colors.text.muted};
  text-transform: uppercase;
  font-weight: ${designTokens.typography.fontWeight.medium};
  opacity: 0.8;
  padding-top: ${designTokens.spacing.sm};
`;

export const BarWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  justify-content: flex-end;
  max-width: 60px;
`;

export const BarTooltip = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid ${designTokens.colors.primary[400]};
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.sm} ${designTokens.spacing.md};
  white-space: nowrap;
  opacity: ${props => props.$visible ? 1 : 0};
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: ${designTokens.colors.primary[400]};
  }
`;

export const TooltipMonth = styled.div`
  font-size: ${designTokens.typography.fontSize.sm};
  color: ${designTokens.colors.primary[400]};
  font-weight: ${designTokens.typography.fontWeight.bold};
  margin-bottom: ${designTokens.spacing.xs};
`;

export const TooltipGames = styled.div`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${designTokens.colors.text.secondary};
  
  span {
    color: ${designTokens.colors.text.primary};
    font-weight: ${designTokens.typography.fontWeight.bold};
    font-variant-numeric: tabular-nums;
  }
`;

export const SparklineBar = styled.div<{ $height: number; $isPeak?: boolean }>`
  width: 100%;
  height: ${props => Math.max(props.$height, 2)}%;
  background: ${props => props.$isPeak 
    ? `linear-gradient(to top, ${designTokens.colors.primary[600]}, ${designTokens.colors.primary[400]})`
    : `linear-gradient(to top, ${designTokens.colors.primary[500]}, ${designTokens.colors.primary[300]})`
  };
  border-radius: ${designTokens.radius.sm} ${designTokens.radius.sm} 0 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  position: relative;
  box-shadow: ${props => props.$isPeak 
    ? `0 0 16px ${designTokens.colors.primary[400]}60`
    : 'none'
  };
  
  /* Value label above bar */
  &::before {
    content: attr(data-value);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    font-size: ${designTokens.typography.fontSize.xs};
    color: ${props => props.$isPeak 
      ? designTokens.colors.primary[300]
      : designTokens.colors.text.muted};
    font-weight: ${props => props.$isPeak 
      ? designTokens.typography.fontWeight.bold
      : designTokens.typography.fontWeight.medium};
    font-variant-numeric: tabular-nums;
    margin-bottom: ${designTokens.spacing.xs};
    opacity: 0.8;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  
  /* Peak star indicator */
  ${props => props.$isPeak && `
    &::after {
      content: '★';
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      color: ${designTokens.colors.primary[400]};
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
      50% { opacity: 0.6; transform: translateX(-50%) scale(1.2); }
    }
  `}
  
  &:hover {
    background: linear-gradient(to top, ${designTokens.colors.primary[600]}, ${designTokens.colors.primary[300]});
    transform: scaleY(1.05);
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
    
    &::before {
      color: ${designTokens.colors.primary[300]};
      font-weight: ${designTokens.typography.fontWeight.bold};
      transform: translateX(-50%) scale(1.15);
      opacity: 1;
    }
  }
`;

export const TimelineStats = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${designTokens.spacing.lg};
  padding: ${designTokens.spacing.lg};
  background: rgba(15, 23, 42, 0.5);
  border-radius: ${designTokens.radius.lg};
  margin-bottom: ${designTokens.spacing.xl};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${designTokens.spacing.md};
  }
`;

export const StatItem = styled.div`
  flex: 1;
  text-align: center;
  padding: ${designTokens.spacing.sm};
  border-right: 1px solid rgba(148, 163, 184, 0.1);
  
  &:last-child {
    border-right: none;
  }
  
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

export const StatValue = styled.div`
  font-size: ${designTokens.typography.fontSize['2xl']};
  font-weight: ${designTokens.typography.fontWeight.bold};
  color: ${designTokens.colors.primary[400]};
  margin-bottom: ${designTokens.spacing.xs};
  font-variant-numeric: tabular-nums;
`;

export const StatLabel = styled.div`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${designTokens.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${designTokens.typography.letterSpacing.wider};
  font-weight: ${designTokens.typography.fontWeight.semibold};
`;

export const TimelineCaption = styled.p`
  font-size: ${designTokens.typography.fontSize.sm};
  color: ${designTokens.colors.text.tertiary};
  margin: 0;
  font-style: italic;
  line-height: ${designTokens.typography.lineHeight.relaxed};
  text-align: center;
  padding: ${designTokens.spacing.md} ${designTokens.spacing.xl};
  background: rgba(15, 23, 42, 0.3);
  border-radius: ${designTokens.radius.md};
`;

export const RechartsContainer = styled.div`
  background: rgba(15, 23, 42, 0.4);
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing.md};
  
  .recharts-surface {
    overflow: visible;
  }
  
  .recharts-bar-rectangle {
    transition: all 0.3s ease;
  }
  
  .recharts-bar-rectangle:hover {
    filter: brightness(1.2);
  }
`;
