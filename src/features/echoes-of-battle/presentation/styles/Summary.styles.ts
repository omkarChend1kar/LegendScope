import styled from 'styled-components';
import { designTokens } from './designTokens';

export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.xl};
  padding-bottom: ${designTokens.spacing['2xl']};
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${designTokens.spacing.md};
  align-items: stretch;
`;

export const SummaryCard = styled.div`
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(51, 65, 85, 0.6);
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.sm};
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.05);
  transition: transform ${designTokens.transitions.fast}, border-color ${designTokens.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(251, 191, 36, 0.25);
  }
`;

export const SummaryLabel = styled.span`
  font-size: ${designTokens.typography.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${designTokens.colors.text.muted};
`;

export const SummaryValue = styled.span`
  font-size: ${designTokens.typography.fontSize.xl};
  font-weight: ${designTokens.typography.fontWeight.bold};
  color: ${designTokens.colors.text.primary};
`;

export const SummaryValueCompact = styled.span`
  font-size: ${designTokens.typography.fontSize.base};
  font-weight: ${designTokens.typography.fontWeight.semibold};
  color: ${designTokens.colors.text.secondary};
`;

export const SummaryDelta = styled.span<{ $positive?: boolean }>`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${({ $positive }) => ($positive ? '#10B981' : '#F87171')};
  display: inline-flex;
  align-items: center;
  gap: ${designTokens.spacing.xs};
`;

export const SectionCard = styled.div`
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: ${designTokens.radius.lg};
  padding: ${designTokens.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.04);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: ${designTokens.typography.fontSize.base};
  font-weight: ${designTokens.typography.fontWeight.semibold};
  color: ${designTokens.colors.text.primary};
`;

export const SectionSubtitle = styled.span`
  font-size: ${designTokens.typography.fontSize.xs};
  color: ${designTokens.colors.text.muted};
`;

export const RolePerformanceLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${designTokens.spacing.md};
`;

export const ChampionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.sm};
`;

export const ChampionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${designTokens.spacing.md};
  align-items: center;
  padding: ${designTokens.spacing.sm};
  border-radius: ${designTokens.radius.md};
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.4);
`;

export const ChampionBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${designTokens.spacing.sm};
  font-weight: ${designTokens.typography.fontWeight.medium};
  color: ${designTokens.colors.text.primary};

  span {
    font-size: ${designTokens.typography.fontSize.xs};
    color: ${designTokens.colors.text.muted};
  }

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: ${designTokens.radius.full};
    background: ${({ $color }) => $color};
  }
`;

export const ProgressBar = styled.div`
  height: 6px;
  border-radius: ${designTokens.radius.full};
  background: rgba(148, 163, 184, 0.16);
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $value: number; $color?: string }>`
  height: 100%;
  width: ${({ $value }) => `${Math.min($value, 100)}%`};
  background: ${({ $color }) => $color || designTokens.colors.primary[400]};
  border-radius: ${designTokens.radius.full};
  transition: width ${designTokens.transitions.normal};
`;

export const RiskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${designTokens.spacing.md};
`;

export const RiskCard = styled.div`
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(71, 85, 105, 0.4);
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.sm};
`;

export const NarrativeCard = styled.div`
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.08));
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: ${designTokens.radius.lg};
  padding: ${designTokens.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.sm};
`;

export const NarrativeHeadline = styled.h4`
  margin: 0;
  font-size: ${designTokens.typography.fontSize.lg};
  font-weight: ${designTokens.typography.fontWeight.semibold};
  color: ${designTokens.colors.text.primary};
`;

export const NarrativeBody = styled.p`
  margin: 0;
  font-size: ${designTokens.typography.fontSize.sm};
  line-height: ${designTokens.typography.lineHeight.relaxed};
  color: ${designTokens.colors.text.secondary};
`;

const statusBackground = {
  loading: 'rgba(59, 130, 246, 0.12)',
  empty: 'rgba(148, 163, 184, 0.12)',
  error: 'rgba(248, 113, 113, 0.12)',
} as const;

const statusBorder = {
  loading: 'rgba(59, 130, 246, 0.35)',
  empty: 'rgba(148, 163, 184, 0.25)',
  error: 'rgba(248, 113, 113, 0.35)',
} as const;

export const SectionStatus = styled.div<{ $variant: 'loading' | 'empty' | 'error' }>`
  width: 100%;
  min-height: 160px;
  padding: ${designTokens.spacing.xl};
  border-radius: ${designTokens.radius.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${designTokens.spacing.sm};
  text-align: center;
  background: ${({ $variant }) => statusBackground[$variant]};
  border: 1px solid ${({ $variant }) => statusBorder[$variant]};
  color: ${designTokens.colors.text.secondary};
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.25);
`;

export const SectionStatusTitle = styled.span`
  font-size: ${designTokens.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${designTokens.colors.text.muted};
`;

export const SectionStatusMessage = styled.p`
  margin: 0;
  max-width: 420px;
  font-size: ${designTokens.typography.fontSize.sm};
  line-height: ${designTokens.typography.lineHeight.relaxed};
  color: ${designTokens.colors.text.secondary};
`;
