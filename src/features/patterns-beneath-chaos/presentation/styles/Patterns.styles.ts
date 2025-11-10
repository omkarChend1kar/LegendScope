import styled from 'styled-components';
import { designTokens } from '../../../echoes-of-battle/presentation/styles/designTokens';

export const PatternsLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 73px);
  background: ${designTokens.colors.background.primary};
`;

export const PatternsHeader = styled.header`
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  border-bottom: 1px solid ${designTokens.colors.border.default};
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
`;

export const PatternsHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${designTokens.spacing.sm};
`;

export const PatternsTitle = styled.h1`
  margin: 0;
  font-family: 'Cinzel', serif;
  font-size: ${designTokens.typography.fontSize['3xl']};
  font-weight: ${designTokens.typography.fontWeight.bold};
  letter-spacing: 0.04em;
  color: #fcd34d;
`;

export const TabsRow = styled.div`
  display: flex;
  gap: ${designTokens.spacing.xl};
`;

export const PatternsContent = styled.div`
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  position: relative;
  border: none;
  background: transparent;
  color: ${({ $active }) => ($active ? '#f8fafc' : 'rgba(148, 163, 184, 0.85)')};
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  padding: 0.75rem 0;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    border-radius: 9999px;
    background: ${({ $active }) => ($active ? 'linear-gradient(90deg, #22d3ee, #38bdf8)' : 'transparent')};
    transition: background 0.2s ease;
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
export const SectionCard = styled.section`
  background: rgba(9, 14, 30, 0.94);
  border: 1px solid rgba(51, 65, 85, 0.55);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 18px 38px rgba(2, 6, 23, 0.32);
`;

export const SummaryHeader = styled(SectionCard)`
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.9));
  border: 1px solid rgba(56, 189, 248, 0.35);
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: minmax(0, 2.4fr) minmax(0, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryPrimaryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  width: 100%;
`;

export const SummaryMetaColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end;
  justify-content: flex-start;
  min-width: 0;
  width: 100%;
  max-width: 320px;
  justify-self: flex-end;

  @media (max-width: 1024px) {
    align-items: flex-start;
    max-width: none;
    justify-self: stretch;
  }
`;

export const SummaryTopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
`;

export const SummaryHeadingLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.78);
`;

export const SummaryBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.28);
  color: #e0f2fe;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const SummaryOneLiner = styled.p`
  margin: 0;
  font-size: 1rem;
  color: rgba(226, 232, 240, 0.92);
  line-height: 1.5;
  max-width: 680px;
`;

export const SummaryMetaRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
  color: rgba(148, 163, 184, 0.88);
  font-size: 0.8rem;
  width: 100%;
`;

export const HistoricalPlaceholder = styled(SectionCard)`
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  min-height: 320px;
  color: rgba(148, 163, 184, 0.9);
`;

export const SummaryStat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background: rgba(12, 20, 38, 0.92);
  border: 1px solid rgba(30, 64, 175, 0.3);
  color: #e0f2fe;
  font-size: 0.8rem;
  width: 100%;
`;

export const GridTwoColumns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 1.5rem;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

export const MetricTile = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(71, 85, 105, 0.45);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;

export const MetricLabel = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(148, 163, 184, 0.75);
`;

export const MetricValue = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${designTokens.colors.primary[200]};
`;

export const RadarWrapper = styled.div`
  width: 100%;
  height: 280px;
  background: rgba(5, 12, 28, 0.92);
  border-radius: 0.75rem;
  border: 1px solid rgba(45, 55, 72, 0.6);
  padding: 1rem;
`;

export const AxesContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.35rem;
  align-items: stretch;
  grid-auto-flow: dense;

  @media (max-width: 960px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const AxisChartColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;

  @media (min-width: 1024px) {
    grid-column: span 2;
  }
`;

export const AxisScoreBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #22d3ee;
  background: rgba(34, 211, 238, 0.16);
  border: 1px solid rgba(34, 211, 238, 0.35);
  box-shadow: 0 0 12px rgba(34, 211, 238, 0.18);
`;

export const AxisCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  padding: 1.1rem 1.2rem;
  border-radius: 0.9rem;
  background: linear-gradient(155deg, rgba(13, 22, 44, 0.96), rgba(11, 18, 36, 0.9));
  border: 1px solid rgba(56, 189, 248, 0.28);
  box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.08);
  height: 100%;
  min-height: 0;
`;

export const AxisCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
`;

export const AxisCardTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.98rem;
  font-weight: 600;
  color: rgba(226, 232, 240, 0.94);
  min-width: 0;
  line-height: 1.35;
`;

export const AxisMetricList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const AxisMetricItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const AxisMetricRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const AxisMetricMeter = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 9999px;
  background: rgba(30, 41, 59, 0.7);
  overflow: hidden;
  border: 1px solid rgba(30, 64, 175, 0.3);
`;

export const AxisMetricBar = styled.div<{ $positive: boolean; $intensity: number }>`
  width: ${({ $intensity }) => `${Math.min(100, Math.max(0, $intensity * 100)).toFixed(0)}%`};
  height: 100%;
  border-radius: 9999px;
  background: ${({ $positive }) =>
    $positive
      ? 'linear-gradient(90deg, rgba(34, 197, 94, 0.75), rgba(74, 222, 128, 0.95))'
      : 'linear-gradient(90deg, rgba(248, 113, 113, 0.75), rgba(249, 115, 22, 0.9))'};
  box-shadow: ${({ $positive }) =>
    $positive ? '0 0 10px rgba(34, 197, 94, 0.22)' : '0 0 10px rgba(249, 115, 22, 0.22)'};
  transition: width 0.3s ease;
`;

export const AxisMetricLabel = styled.span`
  flex: 1;
  font-size: 0.82rem;
  color: rgba(226, 232, 240, 0.9);
  line-height: 1.4;
`;

export const AxisMetricUnit = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.75);
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 9999px;
  padding: 0.12rem 0.45rem;
  white-space: nowrap;
`;

export const AxisMetricValue = styled.span<{ $positive: boolean }>`
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${({ $positive }) => ($positive ? '#4ade80' : '#fb923c')};
  margin-left: auto;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const SectionHeadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #f1f5f9;
`;

export const SectionSubtitle = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.78);
`;

export const TempoLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: stretch;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

export const TempoChartPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  background: linear-gradient(165deg, rgba(11, 18, 36, 0.95), rgba(13, 25, 46, 0.92));
  border: 1px solid rgba(56, 189, 248, 0.22);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &::after {
    content: '';
    position: absolute;
    inset: -40% 35% 40% -10%;
    background: radial-gradient(ellipse at top, rgba(14, 165, 233, 0.18), transparent 60%);
    pointer-events: none;
  }
`;

export const TempoChartHeader = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
`;

export const TempoChartLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  span {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: rgba(148, 163, 184, 0.7);
  }

  strong {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(226, 232, 240, 0.95);
  }
`;

export const TempoChartDescriptor = styled.p`
  margin: 0;
  font-size: 0.78rem;
  color: rgba(148, 163, 184, 0.82);
  max-width: 18rem;
  line-height: 1.5;
`;

export const TempoLegend = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const TempoLegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: rgba(203, 213, 225, 0.85);
`;

export const TempoLegendSwatch = styled.span<{ $color: string; $pattern?: 'dashed' | 'solid' }>`
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 10px ${({ $color }) => `${$color}55`};

  ${({ $pattern, $color }) =>
    $pattern === 'dashed'
      ? `background: transparent; border: 2px dashed ${$color}; width: 16px; height: 16px; border-radius: 8px;`
      : ''};
`;

export const TempoLegendLabel = styled.span`
  letter-spacing: 0.04em;
`;

export const TempoChartViewport = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 280px;
`;

export const TempoSummaryGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const TempoSummaryCard = styled.div`
  border-radius: 0.9rem;
  background: rgba(12, 20, 36, 0.92);
  border: 1px solid rgba(99, 102, 241, 0.24);
  padding: 1.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: rgba(226, 232, 240, 0.94);
  min-height: 0;
`;

export const TempoSummaryTitle = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(148, 163, 184, 0.78);
`;

export const TempoSummaryPhase = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${designTokens.colors.primary[100]};
`;

export const TempoSummaryMetric = styled.span`
  font-size: 1.35rem;
  font-weight: 700;
  color: rgba(248, 250, 252, 0.95);
`;

export const TempoSummaryDescription = styled.p`
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgba(148, 163, 184, 0.82);
`;

export const TempoPhaseGrid = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

export const TempoPhaseCard = styled.div`
  border-radius: 0.85rem;
  background: rgba(9, 16, 32, 0.95);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 1.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
`;

export const TempoPhaseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
`;

export const TempoPhaseTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(226, 232, 240, 0.95);
`;

export const TempoPhasePill = styled.span`
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(56, 189, 248, 0.16);
  border: 1px solid rgba(56, 189, 248, 0.32);
  color: rgba(144, 205, 244, 0.95);
`;

export const TempoMetricList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TempoMetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const TempoMetricRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const TempoMetricLabel = styled.span`
  font-size: 0.82rem;
  color: rgba(203, 213, 225, 0.88);
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
`;

export const TempoMetricUnit = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.6);
`;

export const TempoMetricValue = styled.span<{ $positive: boolean }>`
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({ $positive }) => ($positive ? '#38d399' : '#fb7185')};
`;

export const TempoMetricMeter = styled.div`
  height: 4px;
  width: 100%;
  border-radius: 9999px;
  background: rgba(30, 41, 59, 0.7);
  overflow: hidden;
  border: 1px solid rgba(30, 64, 175, 0.22);
`;

export const TempoMetricBar = styled.span<{ $positive: boolean; $percent: number }>`
  display: block;
  height: 100%;
  border-radius: 9999px;
  width: ${({ $percent }) => `${Math.max(0, Math.min(1, $percent)) * 100}%`};
  background: ${({ $positive }) =>
    $positive
      ? 'linear-gradient(90deg, rgba(34, 197, 94, 0.75), rgba(74, 222, 128, 0.95))'
      : 'linear-gradient(90deg, rgba(249, 115, 22, 0.75), rgba(248, 113, 113, 0.95))'};
  box-shadow: ${({ $positive }) =>
    $positive ? '0 0 10px rgba(34, 197, 94, 0.25)' : '0 0 10px rgba(248, 113, 113, 0.25)'};
  transition: width 0.3s ease;
`;

export const ConsistencyBadge = styled.span`
  align-self: flex-start;
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(245, 158, 11, 0.16);
  border: 1px solid rgba(245, 158, 11, 0.32);
  color: #facc15;
`;

export const RoleMixRow = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const RoleChartColumn = styled.div`
  flex: 0 0 220px;
  height: 220px;
`;

export const RoleDetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RoleList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
`;

export const RoleItem = styled.li`
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgba(15, 23, 42, 0.86);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: rgba(226, 232, 240, 0.92);
  font-size: 0.85rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  height: 100%;
`;

export const ComfortList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
`;

export const ComfortItem = styled.li`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid rgba(99, 102, 241, 0.32);
  display: grid;
  grid-template-columns: minmax(140px, 1.2fr) repeat(3, minmax(80px, 1fr));
  gap: 0.75rem;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(226, 232, 240, 0.92);
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;

export const ComfortAxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: rgba(148, 163, 184, 0.9);
`;

export const InsightList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem;
`;

export const InsightItem = styled.li`
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background: rgba(12, 20, 38, 0.92);
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: rgba(226, 232, 240, 0.92);
  font-size: 0.9rem;
  line-height: 1.45;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;
