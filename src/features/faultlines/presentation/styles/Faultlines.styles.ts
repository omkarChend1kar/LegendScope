import styled, { css } from 'styled-components';
import { designTokens } from '../../../echoes-of-battle/presentation/styles/designTokens';

export const FaultlinesLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 73px);
  background: ${designTokens.colors.background.primary};
`;

export const FaultlinesHeader = styled.header`
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  border-bottom: 1px solid ${designTokens.colors.border.default};
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
`;

export const FaultlinesHeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${designTokens.spacing.md};
`;

export const FaultlinesTitle = styled.h1`
  font-family: 'Cinzel', serif;
  font-size: ${designTokens.typography.fontSize['3xl']};
  letter-spacing: 0.04em;
  color: #fcd34d;
  margin: 0;
`;

export const FaultlinesSubtitle = styled.p`
  margin: 0;
  max-width: 720px;
  color: rgba(226, 232, 240, 0.82);
  font-size: ${designTokens.typography.fontSize.base};
  line-height: ${designTokens.typography.lineHeight.relaxed};
`;

export const FaultlinesContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
`;

export const AxisScoreContext = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.72);
`;

export const AxisSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const AxisSectionTitle = styled.h3`
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.78);
`;

export const AxisSectionText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(226, 232, 240, 0.9);
`;

export const AxisSignals = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.sm} 0 0;
`;

export const SignalColumn = styled.article<{ $variant: 'positive' | 'negative' | 'neutral' }>`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.sm};
  padding: ${designTokens.spacing.md};
  border-radius: 18px;
  border: 1px solid rgba(59, 130, 246, 0.14);
  background: ${({ $variant }) => {
    switch ($variant) {
      case 'positive':
        return 'linear-gradient(135deg, rgba(34, 197, 94, 0.18), rgba(15, 23, 42, 0.65))';
      case 'negative':
        return 'linear-gradient(135deg, rgba(248, 113, 113, 0.18), rgba(15, 23, 42, 0.65))';
      default:
        return 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(15, 23, 42, 0.6))';
    }
  }};
`;

export const SignalHeading = styled.h4<{ $variant: 'positive' | 'negative' | 'neutral' }>`
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ $variant }) => {
    switch ($variant) {
      case 'positive':
        return 'rgba(74, 222, 128, 0.85)';
      case 'negative':
        return 'rgba(248, 113, 113, 0.85)';
      default:
        return 'rgba(148, 163, 184, 0.85)';
    }
  }};
`;

export const SignalEmpty = styled.p`
  margin: 0;
  color: rgba(148, 163, 184, 0.75);
  font-size: 0.85rem;
  line-height: 1.5;
`;

export const TabsRow = styled.div`
  display: flex;
  gap: ${designTokens.spacing.xl};
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  position: relative;
  border: none;
  background: transparent;
  color: ${({ $active }) => ($active ? '#f8fafc' : 'rgba(148, 163, 184, 0.85)')};
  font-size: ${designTokens.typography.fontSize.base};
  font-weight: ${designTokens.typography.fontWeight.semibold};
  letter-spacing: 0.01em;
  cursor: pointer;
  padding: 0.75rem 0;
  transition: color ${designTokens.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    border-radius: 9999px;
    background: ${({ $active }) => ($active ? 'linear-gradient(90deg, #fcd34d, #fbbf24)' : 'transparent')};
    transition: background ${designTokens.transitions.fast};
  }

  &:hover {
    color: #f8fafc;
  }

  &:disabled {
    color: rgba(71, 85, 105, 0.65);
    cursor: not-allowed;

    &::after {
      background: transparent;
    }
  }
`;

export const AxisVisualizationPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const AxisVisualizationTitle = styled.h4`
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.78);
`;

export const FaultlinesMeta = styled.div`
  text-align: right;
  color: rgba(148, 163, 184, 0.82);
  font-size: ${designTokens.typography.fontSize.sm};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (max-width: 768px) {
    text-align: left;
    width: 100%;
  }
`;

export const InsightsStrip = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

export const InsightCard = styled.article`
  padding: 1.25rem 1.5rem;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(16, 24, 40, 0.92), rgba(15, 23, 42, 0.65));
  border: 1px solid rgba(248, 250, 252, 0.08);
  box-shadow: 0 18px 40px rgba(14, 23, 42, 0.4);
`;

export const InsightLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(248, 250, 252, 0.6);
`;

export const InsightText = styled.p`
  margin: 0.85rem 0 0;
  font-size: 0.98rem;
  line-height: 1.55;
  color: rgba(241, 245, 249, 0.9);
`;

export const AxisGrid = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const AxisCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
  padding: clamp(1.75rem, 2.5vw, 2.25rem);
  border-radius: 22px;
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.9), rgba(17, 24, 39, 0.75));
  border: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow: 0 20px 40px rgba(8, 15, 34, 0.45);
  width: 100%;
`;

export const AxisBody = styled.div`
  display: flex;
  gap: ${designTokens.spacing.lg};
  align-items: stretch;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: ${designTokens.spacing.lg};
  }
`;

export const AxisVisualPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};

  @media (max-width: 1024px) {
    flex: unset;
  }
`;

export const AxisNarrativePanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};

  @media (min-width: 1025px) {
    max-width: 520px;
  }

  @media (max-width: 1024px) {
    flex: unset;
  }
`;

export const AxisHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

export const AxisTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(244, 244, 255, 0.95);
  line-height: 1.4;
`;

export const AxisScoreBadge = styled.div<{ $tone: 'strong' | 'caution' | 'steady' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.35rem 0.8rem;
  ${({ $tone }) => {
    switch ($tone) {
      case 'strong':
        return css`
          background: rgba(34, 197, 94, 0.18);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.35);
        `;
      case 'caution':
        return css`
          background: rgba(248, 113, 113, 0.18);
          color: #fca5a5;
          border: 1px solid rgba(248, 113, 113, 0.28);
        `;
      default:
        return css`
          background: rgba(96, 165, 250, 0.18);
          color: #93c5fd;
          border: 1px solid rgba(96, 165, 250, 0.28);
        `;
    }
  }}
`;

export const AxisInsight = styled.p`
  margin: 0;
  color: rgba(224, 242, 254, 0.92);
  font-size: 0.98rem;
  font-weight: 500;
  line-height: 1.6;
`;

export const AxisDescription = styled.p`
  margin: 0;
  color: rgba(148, 163, 184, 0.78);
  font-size: 0.85rem;
  line-height: 1.5;
`;

export const DerivedFromList = styled.ul`
  margin: 0.6rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const DerivedFromItem = styled.li`
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  color: rgba(186, 230, 253, 0.85);
  background: rgba(15, 23, 42, 0.7);
`;

export const AxisVisualization = styled.div`
  min-height: 200px;
  height: clamp(200px, 24vh, 260px);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.12);
  padding: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MetricList = styled.ul`
  margin: 0.5rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

export const MetricItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  font-size: 0.85rem;
  color: rgba(226, 232, 240, 0.88);
`;

export const MetricLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: rgba(203, 213, 225, 0.92);
  font-size: 0.85rem;
`;

export const MetricValue = styled.span<{ $trend?: 'up' | 'down' | 'flat' }>`
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  font-size: 0.95rem;
  ${({ $trend }) => {
    if ($trend === 'up') {
      return css`
        color: #4ade80;
      `;
    }
    if ($trend === 'down') {
      return css`
        color: #f87171;
      `;
    }
    return css`
      color: rgba(244, 244, 255, 0.92);
    `;
  }}
`;

export const MetricUnit = styled.span`
  font-size: 0.72rem;
  color: rgba(148, 163, 184, 0.65);
`;

export const MetricMeter = styled.div`
  height: 6px;
  border-radius: 999px;
  background: rgba(30, 41, 59, 0.9);
  overflow: hidden;
  margin-top: 0.25rem;
`;

export const MetricBar = styled.div<{ $percent: number; $tone?: 'positive' | 'negative' }>`
  height: 100%;
  border-radius: 999px;
  width: ${({ $percent }) => `${Math.max(6, Math.min(100, Math.round($percent * 100)))}%`};
  ${({ $tone }) => ($tone === 'negative'
    ? css`background: linear-gradient(90deg, rgba(248, 113, 113, 0.7), rgba(248, 113, 113, 0.45));`
    : css`background: linear-gradient(90deg, rgba(56, 189, 248, 0.82), rgba(56, 189, 248, 0.52));`)}
`;

export const PlaceholderState = styled.div`
  padding: 2.5rem;
  border-radius: 22px;
  border: 1px dashed rgba(148, 163, 184, 0.35);
  background: rgba(15, 23, 42, 0.45);
  color: rgba(148, 163, 184, 0.82);
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.65;
`;

export const LoadingCard = styled(PlaceholderState)`
  border-style: solid;
  border-color: rgba(56, 189, 248, 0.35);
  background: rgba(15, 23, 42, 0.65);
  color: rgba(191, 219, 254, 0.85);
`;

export const BoxPlotWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxPlotTrack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 88%;
  height: 2px;
  background: rgba(148, 163, 184, 0.35);
`;

export const BoxPlotWhisker = styled.div<{ $position: number }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 32px;
  background: rgba(226, 232, 240, 0.75);
  left: ${({ $position }) => `${$position}%`};
`;

export const BoxPlotBox = styled.div<{ $start: number; $width: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ $start }) => `${$start}%`};
  width: ${({ $width }) => `${$width}%`};
  height: 24px;
  border-radius: 8px;
  border: 1px solid rgba(56, 189, 248, 0.45);
  background: rgba(56, 189, 248, 0.18);
`;

export const BoxPlotMedian = styled.div<{ $position: number }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 3px;
  height: 28px;
  background: #38bdf8;
  left: ${({ $position }) => `${$position}%`};
`;
