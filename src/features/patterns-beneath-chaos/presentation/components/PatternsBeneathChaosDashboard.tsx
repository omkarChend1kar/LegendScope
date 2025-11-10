import React from 'react';
import {
  PatternsLayout,
  PatternsContent,
  PatternsHeader,
  PatternsHeaderTop,
  PatternsTitle,
  SummaryHeader,
  SummaryPrimaryColumn,
  SummaryMetaColumn,
  SummaryTopRow,
  SummaryHeadingLabel,
  SummaryBadge,
  SummaryOneLiner,
  SummaryMetaRow,
  SummaryStat,
  SectionCard,
  SectionHeader,
  SectionHeadingGroup,
  SectionTitle,
  SectionSubtitle,
  HistoricalPlaceholder,
  RadarWrapper,
  AxesContent,
  AxisChartColumn,
  AxisCard,
  AxisCardHeader,
  AxisCardTitle,
  AxisScoreBadge,
  AxisMetricList,
  AxisMetricItem,
  AxisMetricRow,
  AxisMetricLabel,
  AxisMetricUnit,
  AxisMetricValue,
  AxisMetricMeter,
  AxisMetricBar,
  MetricsGrid,
  MetricTile,
  MetricLabel,
  MetricValue,
  TempoLayout,
  TempoChartPanel,
  TempoChartHeader,
  TempoChartLabel,
  TempoChartDescriptor,
  TempoLegend,
  TempoLegendItem,
  TempoLegendSwatch,
  TempoLegendLabel,
  TempoChartViewport,
  TempoSummaryGrid,
  TempoSummaryCard,
  TempoSummaryTitle,
  TempoSummaryPhase,
  TempoSummaryMetric,
  TempoSummaryDescription,
  TempoPhaseGrid,
  TempoPhaseCard,
  TempoPhaseHeader,
  TempoPhaseTitle,
  TempoPhasePill,
  TempoMetricList,
  TempoMetricItem,
  TempoMetricRow,
  TempoMetricLabel,
  TempoMetricUnit,
  TempoMetricValue,
  TempoMetricMeter,
  TempoMetricBar,
  ConsistencyBadge,
  InsightList,
  InsightItem,
} from '../styles/Patterns.styles';
import type {
  PatternsSummary,
  PlaystyleAxis,
  AxisMetric,
  TempoPhaseSummary as TempoPhaseSummaryEntity,
  TempoHighlight as TempoHighlightEntity,
} from '../../domain/entities/PatternsSummary';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { BackendStatus } from '../../../../types/BackendStatus';
import { SyncHeader } from '../../../../components/shared/SyncHeader';

interface PatternsBeneathChaosDashboardProps {
  summary: PatternsSummary | null;
  loading: boolean;
  error: string | null;
  status: BackendStatus;
  message: string | null;
  onSync?: () => Promise<void>;
  lastSyncTime?: Date | null;
}
const formatPercent = (value: number): string => `${Math.round(value * 100)}%`;

export const PatternsBeneathChaosDashboard: React.FC<PatternsBeneathChaosDashboardProps> = ({
  summary,
  loading,
  error,
  status,
  message,
  onSync,
  lastSyncTime,
}) => {

  if (loading) {
    return (
      <PatternsLayout>
        <PatternsHeader>
          <PatternsHeaderTop>
            <PatternsTitle>Signature Playstyle Analyzer</PatternsTitle>
            <SyncHeader lastSyncTime={lastSyncTime} onSync={onSync} />
          </PatternsHeaderTop>
        </PatternsHeader>
        <PatternsContent>
          <SectionCard>
            <SectionHeader>
              <SectionTitle>Analysing signature playstyle…</SectionTitle>
              <SectionSubtitle>Crunching the last 20 matches to surface your defining trends.</SectionSubtitle>
            </SectionHeader>
            <p style={{ color: 'rgba(148, 163, 184, 0.8)', margin: 0 }}>
              We're stitching combat tempo, macro pressure, and vision habits into a cohesive profile. Hang tight!
            </p>
          </SectionCard>
        </PatternsContent>
      </PatternsLayout>
    );
  }

  if (error) {
    return (
      <PatternsLayout>
        <PatternsHeader>
          <PatternsHeaderTop>
            <PatternsTitle>Signature Playstyle Analyzer</PatternsTitle>
            <SyncHeader lastSyncTime={lastSyncTime} onSync={onSync} />
          </PatternsHeaderTop>
        </PatternsHeader>
        <PatternsContent>
          <SectionCard>
            <SectionHeader>
              <SectionTitle>Signature analyzer unavailable</SectionTitle>
            </SectionHeader>
            <p style={{ color: '#fca5a5', margin: 0 }}>{error}</p>
          </SectionCard>
        </PatternsContent>
      </PatternsLayout>
    );
  }

  if (!summary) {
    const infoTitle = status === 'NO_MATCHES'
      ? 'Need a few more clashes'
      : 'Signature analyzer warming up';
    const infoSubtitle = message ?? 'Link or play additional matches to unlock your analyzer';
    const defaultDescription = 'We\'ll chart your recent form once enough data flows in.';

    return (
      <PatternsLayout>
        <PatternsHeader>
          <PatternsHeaderTop>
            <PatternsTitle>Signature Playstyle Analyzer</PatternsTitle>
            <SyncHeader lastSyncTime={lastSyncTime} onSync={onSync} />
          </PatternsHeaderTop>
        </PatternsHeader>
        <PatternsContent>
          {message ? (
            <SectionCard>
              <SectionHeader>
                <SectionTitle>{infoTitle}</SectionTitle>
                <SectionSubtitle>{infoSubtitle}</SectionSubtitle>
              </SectionHeader>
            </SectionCard>
          ) : (
            <HistoricalPlaceholder>
              <SectionHeader>
                <SectionTitle>No patterns yet</SectionTitle>
                <SectionSubtitle>{infoSubtitle}</SectionSubtitle>
              </SectionHeader>
              <p style={{ margin: 0, color: 'rgba(148, 163, 184, 0.82)' }}>
                {defaultDescription}
              </p>
            </HistoricalPlaceholder>
          )}
        </PatternsContent>
      </PatternsLayout>
    );
  }

  const windowLabel = summary.summary.windowLabel ?? 'Last 20 battles';

  const axisValues = Object.values(summary.axes) as PlaystyleAxis[];

  const radarData = axisValues.map((axis) => ({
    axis: axis.label ?? axis.key,
    score: axis.score,
  }));

  interface AxisCardMetric {
    id: string;
    label: string;
    unit?: string;
    displayValue: string;
    intensity: number;
    positive: boolean;
  }

  interface AxisCardData {
    id: string;
    name: string;
    score: number;
    scoreLabel?: string;
    metrics: AxisCardMetric[];
  }

  const axisCards: AxisCardData[] = axisValues.map((axis) => {
    const metrics: AxisCardMetric[] = axis.metrics.slice(0, 4).map((metric: AxisMetric) => ({
      id: metric.id,
      label: metric.label,
      unit: metric.unit,
      displayValue: metric.displayValue,
      intensity: Math.max(0.18, metric.percent / 100),
      positive: metric.direction !== 'negative',
    }));

    return {
      id: axis.key,
      name: axis.label ?? axis.key,
      score: Math.round(axis.score),
      scoreLabel: axis.scoreLabel,
      metrics,
    };
  });

  const efficiencyTiles = [
    { label: 'KDA', value: summary.efficiency.kda.toFixed(2) },
    { label: 'Kill Participation', value: formatPercent(summary.efficiency.kp) },
    { label: 'Damage Share', value: formatPercent(summary.efficiency.damageShare) },
    { label: 'Gold / Minute', value: summary.efficiency.gpm.toString() },
    { label: 'Vision / Minute', value: summary.efficiency.visionPerMin.toFixed(2) },
  ];

  const tempoPhaseSummaries = Object.values(summary.tempo.byPhase) as TempoPhaseSummaryEntity[];

  const tempoPhases = tempoPhaseSummaries.map((phase) => ({
    phase: phase.label,
    key: phase.key,
    kills: phase.killsPer10m,
    deaths: phase.deathsPer10m,
    dpm: phase.dpm,
    cs: phase.csPerMin,
    kp: phase.kp,
  }));

  const tempoHighlights = summary.tempo.highlights as TempoHighlightEntity[];

  const hasTempoData = tempoPhases.length > 0;
  const hasTempoHighlights = tempoHighlights.length > 0;
  const numbersClose = (a: number, b: number, tolerance = 0.0001) => {
    if (Number.isNaN(a) && Number.isNaN(b)) {
      return true;
    }

    return Math.abs(a - b) <= tolerance;
  };

  const metricsEqual = (a: TempoPhaseSummaryEntity['metrics'], b: TempoPhaseSummaryEntity['metrics']) => {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((metric, index) => {
      const other = b[index];

      return (
        metric.id === other.id &&
        metric.direction === other.direction &&
        (metric.unit ?? null) === (other.unit ?? null) &&
        numbersClose(metric.value, other.value) &&
        numbersClose(metric.percent, other.percent)
      );
    });
  };

  const phasesMetricsMatch = (a: TempoPhaseSummaryEntity, b: TempoPhaseSummaryEntity) => (
    numbersClose(a.killsPer10m, b.killsPer10m) &&
    numbersClose(a.deathsPer10m, b.deathsPer10m) &&
    numbersClose(a.dpm, b.dpm) &&
    numbersClose(a.csPerMin, b.csPerMin) &&
    numbersClose(a.kp, b.kp) &&
    metricsEqual(a.metrics, b.metrics)
  );

  const hasTempoPhaseVariation = hasTempoData
    ? tempoPhaseSummaries.some((phase, index) => index > 0 && !phasesMetricsMatch(phase, tempoPhaseSummaries[0]))
    : false;

  return (
    <PatternsLayout>
      <PatternsHeader>
        <PatternsHeaderTop>
          <PatternsTitle>Signature Playstyle Analyzer</PatternsTitle>
          <SyncHeader lastSyncTime={lastSyncTime} onSync={onSync} />
        </PatternsHeaderTop>
      </PatternsHeader>

      <PatternsContent>
            <SummaryHeader>
              <SummaryPrimaryColumn>
                <SummaryHeadingLabel>Identity Anchors</SummaryHeadingLabel>
                <SummaryTopRow>
                  <SummaryBadge>{summary.summary.primaryRole}</SummaryBadge>
                  <SummaryBadge>{summary.summary.playstyleLabel}</SummaryBadge>
                </SummaryTopRow>
                <SummaryOneLiner>{summary.summary.oneLiner}</SummaryOneLiner>
              </SummaryPrimaryColumn>
              <SummaryMetaColumn>
                <SummaryHeadingLabel>Snapshot</SummaryHeadingLabel>
                <SummaryMetaRow>
                  <SummaryStat>
                    {windowLabel} • {summary.summary.record.wins}-{summary.summary.record.losses}
                  </SummaryStat>
                  <SummaryStat>Generated {new Date(summary.generatedAt).toLocaleString()}</SummaryStat>
                </SummaryMetaRow>
              </SummaryMetaColumn>
            </SummaryHeader>

            <SectionCard>
              <SectionHeader>
                <SectionHeadingGroup>
                  <SectionTitle>Core Playstyle Axes</SectionTitle>
                  <SectionSubtitle>Scaled within your own last 20 matches (0–100)</SectionSubtitle>
                </SectionHeadingGroup>
              </SectionHeader>
              <AxesContent>
                <AxisChartColumn>
                  <RadarWrapper>
                    <ResponsiveContainer>
                      <RadarChart data={radarData} margin={{ top: 12, right: 24, bottom: 12, left: 24 }}>
                        <PolarGrid stroke="rgba(148, 163, 184, 0.25)" />
                        <PolarAngleAxis
                          dataKey="axis"
                          stroke="rgba(148, 163, 184, 0.85)"
                          tick={{ fill: '#cbd5f5', fontSize: 12 }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          axisLine={false}
                          tick={{ fill: 'rgba(148, 163, 184, 0.65)', fontSize: 10 }}
                        />
                        <Radar name="Score" dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.35} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </RadarWrapper>
                </AxisChartColumn>
                {axisCards.map((card) => (
                  <AxisCard key={card.id}>
                    <AxisCardHeader>
                      <AxisCardTitle>
                        <span>{card.name}</span>
                        {card.scoreLabel ? (
                          <span
                            style={{
                              fontSize: '0.72rem',
                              color: 'rgba(148, 163, 184, 0.75)',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {card.scoreLabel}
                          </span>
                        ) : null}
                      </AxisCardTitle>
                      <AxisScoreBadge>{card.score}</AxisScoreBadge>
                    </AxisCardHeader>
                    <AxisMetricList>
                      {card.metrics.map((metric) => (
                        <AxisMetricItem key={metric.id}>
                          <AxisMetricRow>
                            <AxisMetricLabel>{metric.label}</AxisMetricLabel>
                            {metric.unit ? <AxisMetricUnit>{metric.unit}</AxisMetricUnit> : null}
                            <AxisMetricValue $positive={metric.positive}>{metric.displayValue}</AxisMetricValue>
                          </AxisMetricRow>
                          <AxisMetricMeter>
                            <AxisMetricBar $positive={metric.positive} $intensity={metric.intensity} />
                          </AxisMetricMeter>
                        </AxisMetricItem>
                      ))}
                    </AxisMetricList>
                  </AxisCard>
                ))}
              </AxesContent>
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <SectionHeadingGroup>
                  <SectionTitle>Outcome & Efficiency</SectionTitle>
                  <SectionSubtitle>Where the scoreline evidences your playstyle choices</SectionSubtitle>
                </SectionHeadingGroup>
                <ConsistencyBadge>{summary.consistency.label}</ConsistencyBadge>
              </SectionHeader>
              <MetricsGrid>
                {efficiencyTiles.map((tile) => (
                  <MetricTile key={tile.label}>
                    <MetricLabel>{tile.label}</MetricLabel>
                    <MetricValue>{tile.value}</MetricValue>
                  </MetricTile>
                ))}
              </MetricsGrid>
              <MetricsGrid>
                <MetricTile>
                  <MetricLabel>KDA CV</MetricLabel>
                  <MetricValue>{(summary.consistency.kdaCV * 100).toFixed(0)}%</MetricValue>
                </MetricTile>
                <MetricTile>
                  <MetricLabel>DPM CV</MetricLabel>
                  <MetricValue>{(summary.consistency.dpmCV * 100).toFixed(0)}%</MetricValue>
                </MetricTile>
                <MetricTile>
                  <MetricLabel>KP CV</MetricLabel>
                  <MetricValue>{(summary.consistency.kpCV * 100).toFixed(0)}%</MetricValue>
                </MetricTile>
                <MetricTile>
                  <MetricLabel>CS CV</MetricLabel>
                  <MetricValue>{(summary.consistency.csCV * 100).toFixed(0)}%</MetricValue>
                </MetricTile>
                <MetricTile>
                  <MetricLabel>Vision CV</MetricLabel>
                  <MetricValue>{(summary.consistency.visionCV * 100).toFixed(0)}%</MetricValue>
                </MetricTile>
              </MetricsGrid>
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <SectionHeadingGroup>
                  <SectionTitle>Tempo Profile</SectionTitle>
                  <SectionSubtitle>Phase-by-phase momentum, output, and lane economy</SectionSubtitle>
                </SectionHeadingGroup>
              </SectionHeader>
                <TempoLayout>
                  <TempoChartPanel>
                    <TempoChartHeader>
                      <TempoChartLabel>
                        <span>Momentum curve</span>
                        <strong>Where your tempo surges or stabilises</strong>
                      </TempoChartLabel>
                      <TempoChartDescriptor>
                        Overlay kills, deaths, damage, and economy to time rotations with your strongest windows.
                      </TempoChartDescriptor>
                    </TempoChartHeader>
                    <TempoLegend>
                      <TempoLegendItem>
                        <TempoLegendSwatch $color="#38bdf8" />
                        <TempoLegendLabel>Kills /10m</TempoLegendLabel>
                      </TempoLegendItem>
                      <TempoLegendItem>
                        <TempoLegendSwatch $color="#f87171" $pattern="dashed" />
                        <TempoLegendLabel>Deaths /10m</TempoLegendLabel>
                      </TempoLegendItem>
                      <TempoLegendItem>
                        <TempoLegendSwatch $color="#facc15" />
                        <TempoLegendLabel>Damage per minute</TempoLegendLabel>
                      </TempoLegendItem>
                      <TempoLegendItem>
                        <TempoLegendSwatch $color="#22c55e" />
                        <TempoLegendLabel>CS per minute</TempoLegendLabel>
                      </TempoLegendItem>
                    </TempoLegend>
                    <TempoChartViewport>
                      {hasTempoData ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={tempoPhases} margin={{ top: 12, right: 24, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                            <XAxis dataKey="phase" stroke="rgba(148, 163, 184, 0.8)" />
                            <YAxis yAxisId="left" stroke="rgba(148, 163, 184, 0.8)" />
                            <YAxis yAxisId="right" orientation="right" stroke="rgba(148, 163, 184, 0.5)" />
                            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.35)' }} />
                            <Line yAxisId="left" type="monotone" dataKey="kills" stroke="#38bdf8" name="Kills/10m" strokeWidth={2} activeDot={{ r: 6 }} />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="deaths"
                              stroke="#f87171"
                              name="Deaths/10m"
                              strokeWidth={2}
                              strokeDasharray="6 4"
                            />
                            <Line yAxisId="right" type="monotone" dataKey="dpm" stroke="#facc15" name="DPM" strokeWidth={2} />
                            <Line yAxisId="right" type="monotone" dataKey="cs" stroke="#22c55e" name="CS/min" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          color: 'rgba(148, 163, 184, 0.75)',
                          fontSize: '0.85rem',
                          textAlign: 'center',
                          padding: '0 1rem',
                        }}>
                          Tempo telemetry will unlock once we have enough recent match phases to chart.
                        </div>
                      )}
                    </TempoChartViewport>
                  </TempoChartPanel>
                  <TempoSummaryGrid>
                    {hasTempoHighlights ? (
                      tempoHighlights.map((highlight) => (
                        <TempoSummaryCard key={highlight.id}>
                          <TempoSummaryTitle>{highlight.title}</TempoSummaryTitle>
                          <TempoSummaryPhase>{highlight.phaseLabel}</TempoSummaryPhase>
                          <TempoSummaryMetric>{highlight.metricLabel}</TempoSummaryMetric>
                          <TempoSummaryDescription>{highlight.description}</TempoSummaryDescription>
                        </TempoSummaryCard>
                      ))
                    ) : (
                      <TempoSummaryCard key="tempo-summary-placeholder">
                        <TempoSummaryTitle>Highlight insights</TempoSummaryTitle>
                        <TempoSummaryDescription>
                          We&apos;ll spotlight your peak phases once the analyzer detects repeatable tempo spikes.
                        </TempoSummaryDescription>
                      </TempoSummaryCard>
                    )}
                  </TempoSummaryGrid>
                </TempoLayout>
                {hasTempoData ? (
                  hasTempoPhaseVariation ? (
                    <TempoPhaseGrid>
                      {tempoPhaseSummaries.map((phase) => {
                        return (
                          <TempoPhaseCard key={phase.key}>
                            <TempoPhaseHeader>
                              <TempoPhaseTitle>{phase.label}</TempoPhaseTitle>
                              <TempoPhasePill>{phase.roleLabel}</TempoPhasePill>
                            </TempoPhaseHeader>
                            <TempoMetricList>
                              {phase.metrics.map((metric) => {
                                const percent = Math.max(0, Math.min(100, metric.percent)) / 100;
                                const isPositive = metric.direction !== 'negative';
                                const unit = metric.unit ?? '';
                                const showUnit = Boolean(
                                  unit && !metric.formattedValue.toLowerCase().includes(unit.toLowerCase()),
                                );

                                return (
                                  <TempoMetricItem key={`${phase.key}-${metric.id}`}>
                                    <TempoMetricRow>
                                      <TempoMetricLabel>{metric.label}</TempoMetricLabel>
                                      {showUnit ? <TempoMetricUnit>{unit}</TempoMetricUnit> : null}
                                      <TempoMetricValue $positive={isPositive}>{metric.formattedValue}</TempoMetricValue>
                                    </TempoMetricRow>
                                    <TempoMetricMeter>
                                      <TempoMetricBar $positive={isPositive} $percent={percent} />
                                    </TempoMetricMeter>
                                  </TempoMetricItem>
                                );
                              })}
                            </TempoMetricList>
                          </TempoPhaseCard>
                        );
                      })}
                    </TempoPhaseGrid>
                  ) : (
                    <TempoSummaryGrid style={{ marginTop: '1rem' }}>
                      <TempoSummaryCard>
                        <TempoSummaryTitle>Consistent tempo across phases</TempoSummaryTitle>
                        <TempoSummaryDescription>
                          Your early, mid, and late game metrics follow nearly identical patterns, so we collapsed the detailed phase cards.
                        </TempoSummaryDescription>
                      </TempoSummaryCard>
                    </TempoSummaryGrid>
                  )
                ) : (
                  <TempoSummaryGrid style={{ marginTop: '1rem' }}>
                    <TempoSummaryCard>
                      <TempoSummaryTitle>Phase breakdown pending</TempoSummaryTitle>
                      <TempoSummaryDescription>
                        Play a few more matches so we can map how your tempo evolves from early to late game.
                      </TempoSummaryDescription>
                    </TempoSummaryCard>
                  </TempoSummaryGrid>
                )}
            </SectionCard>
            <SectionCard>
              <SectionHeader>
                <SectionHeadingGroup>
                  <SectionTitle>Insights & Next Steps</SectionTitle>
                  <SectionSubtitle>Actionable nudges shaped by your strongest signals</SectionSubtitle>
                </SectionHeadingGroup>
              </SectionHeader>
              <InsightList>
                {summary.insights.map((insight, index) => (
                  <InsightItem key={`${index}-${insight.slice(0, 12)}`}>{insight}</InsightItem>
                ))}
              </InsightList>
            </SectionCard>
      </PatternsContent>
    </PatternsLayout>
  );
};
