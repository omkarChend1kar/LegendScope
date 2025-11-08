import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type {
  SummaryCard as SummaryCardModel,
  RoleSummary,
  ChampionSummary,
  RiskProfile,
  NarrativeSummary,
} from '../../domain/entities/LastTwentyMatchesSummary';
import type { SummarySection } from '../../types/SummarySection';
import {
  SummaryContent,
  SummaryGrid,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  SummaryValueCompact,
  SectionCard,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  RolePerformanceLayout,
  ChampionList,
  ChampionRow,
  ChampionBadge,
  ProgressBar,
  ProgressFill,
  RiskGrid,
  RiskCard,
  NarrativeCard,
  NarrativeHeadline,
  NarrativeBody,
  SectionStatus,
  SectionStatusTitle,
  SectionStatusMessage,
} from '../styles/Summary.styles';
import { designTokens } from '../styles/designTokens';

interface LastTwentyMatchesSummaryDashboardProps {
  summaryCards: SummarySection<SummaryCardModel>;
  roles: SummarySection<RoleSummary[]>;
  champions: SummarySection<ChampionSummary[]>;
  riskProfile: SummarySection<RiskProfile>;
  narrative: SummarySection<NarrativeSummary>;
}

type StatusVariant = 'loading' | 'empty' | 'error';

const getSectionStatusPresentation = (
  section: SummarySection<unknown>,
  copy: { loading: string; empty: string; error: string }
): { variant: StatusVariant; message: string } | null => {
  if (section.status === 'READY' && section.data) {
    return null;
  }

  if (section.status === 'FAILED') {
    return {
      variant: 'error',
      message: section.message ?? copy.error,
    };
  }

  if (section.status === 'NO_MATCHES') {
    return {
      variant: 'empty',
      message: copy.empty,
    };
  }

  if (section.status === 'READY') {
    return {
      variant: 'empty',
      message: copy.empty,
    };
  }

  return {
    variant: 'loading',
    message: copy.loading,
  };
};

const renderStatusBlock = (
  title: string,
  status: { variant: StatusVariant; message: string } | null
) => {
  if (!status) {
    return null;
  }

  return (
    <SectionStatus $variant={status.variant}>
      <SectionStatusTitle>{title}</SectionStatusTitle>
      <SectionStatusMessage>{status.message}</SectionStatusMessage>
    </SectionStatus>
  );
};

export const LastTwentyMatchesSummaryDashboard: React.FC<LastTwentyMatchesSummaryDashboardProps> = ({
  summaryCards,
  roles,
  champions,
  riskProfile,
  narrative,
}) => {
  const summaryStatus = getSectionStatusPresentation(summaryCards, {
    loading: 'Summoning your last 20 battles...',
    empty: 'We couldn’t find any recent battles to analyze just yet.',
    error: 'We couldn’t load your battle overview right now. Try again soon.',
  });

  const roleStatus = getSectionStatusPresentation(roles, {
    loading: 'Tracking how you performed across each role...',
    empty: 'We couldn’t find enough role data for this timeframe.',
    error: 'Role influence insights are unavailable right now.',
  });

  const championStatus = getSectionStatusPresentation(champions, {
    loading: 'Identifying your most trusted champions...',
    empty: 'No champion insights are available for these battles.',
    error: 'Champion insights are unavailable right now.',
  });

  const riskStatus = getSectionStatusPresentation(riskProfile, {
    loading: 'Analyzing your risk thresholds and tendencies...',
    empty: 'We need a few more battles before we can chart your risk rhythm.',
    error: 'Risk signature is unavailable right now.',
  });

  const narrativeStatus = getSectionStatusPresentation(narrative, {
    loading: 'Weaving together your battle narrative...',
    empty: 'No recent story beats to highlight just yet.',
    error: 'Narrative insights are unavailable right now.',
  });

  interface RoleTooltipEntry {
    payload: {
      name: string;
      claims: number;
      falls: number;
      winRate: number;
    };
  }

  const roleTooltip = ({ active, payload }: { active?: boolean; payload?: RoleTooltipEntry[] }) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;

    return (
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: `1px solid ${designTokens.colors.primary[500]}`,
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
        }}
      >
        <p style={{ margin: 0, color: '#f8fafc', fontWeight: 600 }}>{data.name}</p>
        <p style={{ margin: '0.25rem 0 0', color: '#60a5fa', fontSize: '0.75rem' }}>
          Claims: {data.claims}
        </p>
        <p style={{ margin: '0.125rem 0 0', color: '#f97316', fontSize: '0.75rem' }}>
          Falls: {data.falls}
        </p>
        <p style={{ margin: '0.125rem 0 0', color: '#cbd5f5', fontSize: '0.75rem' }}>
          Win Rate: {data.winRate}%
        </p>
      </div>
    );
  };

  const claimBarColors: string[] = ['#60a5fa', '#818cf8', '#38bdf8', '#0ea5e9', '#1d4ed8'];

  return (
    <SummaryContent>
      {summaryStatus || !summaryCards.data ? (
        <SummaryGrid>
          <SummaryCard>
            {renderStatusBlock('Summary Overview',
              summaryStatus ?? {
                variant: 'empty',
                message: 'Summary data is still on its way.',
              }
            )}
          </SummaryCard>
        </SummaryGrid>
      ) : (
        <SummaryGrid>
          {[
            { label: 'Battles Fought', value: summaryCards.data.battlesFought },
            { label: 'Claims', value: summaryCards.data.claims },
            { label: 'Falls', value: summaryCards.data.falls },
            { label: 'Claim / Fall Ratio', value: summaryCards.data.claimFallRatio.toFixed(2) },
            { label: 'Longest Claim Streak', value: summaryCards.data.longestClaimStreak },
            { label: 'Longest Fall Streak', value: summaryCards.data.longestFallStreak },
            { label: 'Clutch Battles', value: summaryCards.data.clutchGames },
            { label: 'Surrender Rate', value: `${summaryCards.data.surrenderRate}%` },
            { label: 'Average Duration', value: summaryCards.data.averageMatchDuration },
          ].map((item) => (
            <SummaryCard key={item.label}>
              <SummaryLabel>{item.label}</SummaryLabel>
              <SummaryValue>{item.value}</SummaryValue>
            </SummaryCard>
          ))}
        </SummaryGrid>
      )}

      <SectionCard>
        <SectionHeader>
          <SectionTitle>Role Influence</SectionTitle>
          <SectionSubtitle>Claims vs Falls across your positions</SectionSubtitle>
        </SectionHeader>
        {roleStatus || !roles.data ? (
          renderStatusBlock('Role Influence',
            roleStatus ?? {
              variant: 'empty',
              message: 'Role insights are still warming up.',
            }
          )
        ) : (
          <RolePerformanceLayout>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <BarChart
                  data={roles.data.map((role) => ({
                    name: role.role,
                    claims: role.claims,
                    falls: role.falls,
                    games: role.games,
                    winRate: role.winRate,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                  <XAxis dataKey="name" stroke={designTokens.colors.text.tertiary} fontSize={10} />
                  <YAxis stroke={designTokens.colors.text.tertiary} fontSize={10} allowDecimals={false} />
                  <Tooltip content={roleTooltip} cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }} />
                  <Bar dataKey="claims" radius={[4, 4, 0, 0]} barSize={16}>
                    {roles.data.map((entry, index) => (
                      <Cell key={`claim-${entry.role}`} fill={claimBarColors[index % claimBarColors.length]} />
                    ))}
                  </Bar>
                  <Bar dataKey="falls" radius={[4, 4, 0, 0]} barSize={16}>
                    {roles.data.map((entry) => (
                      <Cell key={`fall-${entry.role}`} fill="#f97316" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <ChampionList>
              {roles.data.map((role) => (
                <ChampionRow key={role.role}>
                  <ChampionBadge $color={designTokens.colors.primary[400]}>
                    {role.role}
                    <span>
                      {role.games} games • {role.winRate}% claim rate
                    </span>
                  </ChampionBadge>
                  <SummaryValueCompact>{role.averageKda.toFixed(1)} KDA</SummaryValueCompact>
                </ChampionRow>
              ))}
            </ChampionList>
          </RolePerformanceLayout>
        )}
      </SectionCard>

      <SectionCard>
        <SectionHeader>
          <SectionTitle>Champions of War</SectionTitle>
          <SectionSubtitle>Your trusted arsenal over the last 20 battles</SectionSubtitle>
        </SectionHeader>
        {championStatus || !champions.data ? (
          renderStatusBlock('Champion Insights',
            championStatus ?? {
              variant: 'empty',
              message: 'Champion insights are still on the forge.',
            }
          )
        ) : (
          <ChampionList>
            {champions.data.map((champion) => (
              <div key={champion.name}>
                <ChampionRow>
                  <ChampionBadge $color={champion.color}>{champion.name}</ChampionBadge>
                  <SummaryLabel>{champion.games} games</SummaryLabel>
                  <SummaryValue>{champion.winRate}%</SummaryValue>
                </ChampionRow>
                <ProgressBar>
                  <ProgressFill $value={champion.winRate} $color={champion.color} />
                </ProgressBar>
              </div>
            ))}
          </ChampionList>
        )}
      </SectionCard>

      <SectionCard>
        <SectionHeader>
          <SectionTitle>Risk & Rhythm</SectionTitle>
          <SectionSubtitle>
            {riskProfile.status === 'READY' && riskProfile.data
              ? riskProfile.data.narrative
              : 'We’re distilling your risk signature...'}
          </SectionSubtitle>
        </SectionHeader>
        {riskStatus || !riskProfile.data ? (
          renderStatusBlock('Risk & Rhythm',
            riskStatus ?? {
              variant: 'empty',
              message: 'Risk insights are calibrating for your next clash.',
            }
          )
        ) : (
          <RiskGrid>
            {[
              {
                label: 'Early Game Aggression',
                value: riskProfile.data.earlyAggression,
                description: 'Participation in first blood or first tower',
                color: designTokens.colors.primary[400],
              },
              {
                label: 'Early Falls',
                value: riskProfile.data.earlyFalls,
                description: 'Deaths before minute ten',
                color: '#F87171',
              },
              {
                label: 'Objective Control',
                value: riskProfile.data.objectiveControl,
                description: 'Presence in first dragon/herald captures',
                color: '#38BDF8',
              },
              {
                label: 'Vision Commitment',
                value: riskProfile.data.visionCommitment,
                description: 'Average wards placed and cleared',
                color: '#34D399',
              },
            ].map((metric) => (
              <RiskCard key={metric.label}>
                <SummaryLabel>{metric.label}</SummaryLabel>
                <SummaryValue>{metric.value}%</SummaryValue>
                <SectionSubtitle>{metric.description}</SectionSubtitle>
                <ProgressBar>
                  <ProgressFill $value={metric.value} $color={metric.color} />
                </ProgressBar>
              </RiskCard>
            ))}
          </RiskGrid>
        )}
      </SectionCard>

      <NarrativeCard>
        {narrativeStatus || !narrative.data ? (
          renderStatusBlock('Echo Narrative',
            narrativeStatus ?? {
              variant: 'empty',
              message: 'Narrative insights will appear once fresh battles are logged.',
            }
          )
        ) : (
          <>
            <NarrativeHeadline>{narrative.data.headline}</NarrativeHeadline>
            <NarrativeBody>{narrative.data.body}</NarrativeBody>
          </>
        )}
      </NarrativeCard>
    </SummaryContent>
  );
};
