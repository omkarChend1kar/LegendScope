import styled from 'styled-components';
import { designTokens } from './designTokens';

export const PageContainer = styled.div`
  min-height: calc(100vh - 73px);
  padding: ${designTokens.spacing['3xl']} ${designTokens.spacing.lg};
  position: relative;
  background: 
    radial-gradient(circle at 20% 10%, rgba(251, 191, 36, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 90%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
    ${designTokens.colors.background.primary};
  
  /* Performance optimization */
  will-change: scroll-position;
  transform: translateZ(0);
  
  @media (max-width: 768px) {
    padding: ${designTokens.spacing.xl} ${designTokens.spacing.md};
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: ${designTokens.spacing['3xl']};
  padding-bottom: ${designTokens.spacing.xl};
  position: relative;
  animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  
  /* Performance optimization */
  will-change: transform, opacity;
  transform: translateZ(0);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      ${designTokens.colors.primary[400]},
      transparent
    );
    border-radius: ${designTokens.radius.full};
  }
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-40px) translateZ(0);
    }
    to {
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    animation: fadeIn 0.3s ease both;
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${designTokens.colors.primary[300]} 0%,
    ${designTokens.colors.primary[400]} 50%,
    ${designTokens.colors.primary[500]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${designTokens.spacing.lg} 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  position: relative;
`;

export const Subtitle = styled.p`
  font-size: ${designTokens.typography.fontSize.xl};
  color: ${designTokens.colors.text.secondary};
  margin: 0 0 ${designTokens.spacing.lg} 0;
  line-height: ${designTokens.typography.lineHeight.relaxed};
  font-weight: 400;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

export const EmotionTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${designTokens.spacing.xs};
  padding: ${designTokens.spacing.sm} ${designTokens.spacing.lg};
  background: rgba(251, 191, 36, 0.12);
  border: 1px solid rgba(251, 191, 36, 0.15);
  border-radius: ${designTokens.radius.full};
  color: ${designTokens.colors.primary[300]};
  font-size: ${designTokens.typography.fontSize.xs};
  font-weight: ${designTokens.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: ${designTokens.spacing.lg};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: rgba(251, 191, 36, 0.18);
    border-color: rgba(251, 191, 36, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.15);
    will-change: transform, box-shadow;
  }
`;

// Analytics Dashboard Layout (Twitter-style)
export const AnalyticsContainer = styled.div`
  background: ${designTokens.colors.background.primary};
  min-height: calc(100vh - 73px);
`;

export const AnalyticsHeader = styled.div`
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  border-bottom: 1px solid ${designTokens.colors.border.default};
  background: rgba(15, 23, 42, 0.5);
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AnalyticsTitle = styled.h1`
  font-family: 'Cinzel', serif;
  font-size: ${designTokens.typography.fontSize['3xl']};
  font-weight: ${designTokens.typography.fontWeight.bold};
  letter-spacing: 0.04em;
  color: #fcd34d;
  margin: 0;
`;

export const TimeRangeSelector = styled.div`
  display: flex;
  gap: ${designTokens.spacing.xs};
  background: rgba(30, 41, 59, 0.5);
  padding: 4px;
  border-radius: ${designTokens.radius.md};
  border: 1px solid ${designTokens.colors.border.default};
`;

export const TimeRangeButton = styled.button<{ $active?: boolean }>`
  padding: 6px 14px;
  border: none;
  background: ${props => props.$active ? designTokens.colors.primary[500] : 'transparent'};
  color: ${props => props.$active ? designTokens.colors.text.primary : designTokens.colors.text.muted};
  font-size: ${designTokens.typography.fontSize.xs};
  font-weight: ${designTokens.typography.fontWeight.semibold};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$active ? designTokens.colors.primary[500] : 'rgba(148, 163, 184, 0.1)'};
    color: ${designTokens.colors.text.primary};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: ${designTokens.spacing.xl};
`;

export const Tab = styled.button<{ $active?: boolean }>`
  padding: ${designTokens.spacing.md} 0;
  border: none;
  background: transparent;
  color: ${props => props.$active ? designTokens.colors.text.primary : designTokens.colors.text.muted};
  font-size: ${designTokens.typography.fontSize.base};
  font-weight: ${designTokens.typography.fontWeight.semibold};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.$active ? designTokens.colors.primary[400] : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${designTokens.colors.text.primary};
  }
`;

export const AnalyticsContent = styled.div`
  padding: ${designTokens.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.base};
  font-weight: ${designTokens.typography.fontWeight.bold};
  color: ${designTokens.colors.text.primary};
  margin: 0 0 ${designTokens.spacing.sm} 0;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const MetricCard = styled.div`
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid ${designTokens.colors.border.default};
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.md};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background: rgba(30, 41, 59, 0.7);
    border-color: ${designTokens.colors.border.hover};
  }
`;

export const MetricLabel = styled.div`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${designTokens.colors.text.muted};
  font-weight: ${designTokens.typography.fontWeight.medium};
  margin-bottom: ${designTokens.spacing.xs};
`;

export const MetricValue = styled.div`
  font-size: ${designTokens.typography.fontSize['2xl']};
  font-weight: ${designTokens.typography.fontWeight.bold};
  color: ${designTokens.colors.text.primary};
  font-variant-numeric: tabular-nums;
  line-height: 1;
`;

export const MetricChange = styled.div<{ $positive?: boolean }>`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${props => props.$positive ? '#10B981' : '#EF4444'};
  margin-top: ${designTokens.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.xs};
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing.lg};
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartSection = styled.div`
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid ${designTokens.colors.border.default};
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.md};
  min-height: 220px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background: rgba(30, 41, 59, 0.7);
    border-color: ${designTokens.colors.border.hover};
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${designTokens.spacing.lg};
`;

export const ChartTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.base};
  font-weight: ${designTokens.typography.fontWeight.semibold};
  color: ${designTokens.colors.text.primary};
  margin: 0;
`;
