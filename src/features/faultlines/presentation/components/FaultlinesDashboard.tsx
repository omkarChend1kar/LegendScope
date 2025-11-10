import React from 'react';
import {
  FaultlinesLayout,
  FaultlinesHeader,
  FaultlinesHeaderTop,
  FaultlinesTitle,
  FaultlinesSubtitle,
  FaultlinesContent,
  AxisGrid,
  AxisCard,
  AxisHeader,
  AxisTitle,
  AxisScoreBadge,
  AxisSection,
  AxisSectionTitle,
  AxisSectionText,
  AxisSignals,
  SignalColumn,
  SignalHeading,
  SignalEmpty,
  AxisVisualizationPanel,
  AxisVisualizationTitle,
  AxisBody,
  AxisVisualPanel,
  AxisNarrativePanel,
  AxisInsight,
  AxisDescription,
  DerivedFromList,
  DerivedFromItem,
  AxisVisualization,
  MetricList,
  MetricItem,
  MetricLabel,
  MetricValue,
  MetricUnit,
  MetricMeter,
  MetricBar,
  PlaceholderState,
  LoadingCard,
  BoxPlotWrapper,
  BoxPlotTrack,
  BoxPlotWhisker,
  BoxPlotBox,
  BoxPlotMedian,
  AxisScoreContext,
} from '../styles/Faultlines.styles';
import type { FaultlinesSummary, FaultlineAxis } from '../../domain/entities/FaultlinesSummary';
import type { BackendStatus } from '../../../../types/BackendStatus';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadarChart,
  Radar,
} from 'recharts';
import { SyncHeader } from '../../../../components/shared/SyncHeader';

interface FaultlinesDashboardProps {
  summary: FaultlinesSummary | null;
  loading: boolean;
  error: string | null;
  status: BackendStatus;
  message: string | null;
  onSync?: () => Promise<void>;
  lastSyncTime?: Date | null;
}

const determineTone = (score: number): 'strong' | 'steady' | 'caution' => {
  if (score >= 70) {
    return 'strong';
  }

  if (score <= 40) {
    return 'caution';
  }

  return 'steady';
};


const renderVisualization = (axis: FaultlineAxis): React.ReactNode => {
  const visualization = axis.visualization;

  switch (visualization.type) {
    case 'bar': {
      const data = [
        { key: 'score', label: 'Score', value: visualization.value },
        ...(typeof visualization.benchmark === 'number'
          ? [{ key: 'benchmark', label: 'Benchmark', value: visualization.benchmark }]
          : []),
      ];

      return (
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="label"
              tick={{ fill: 'rgba(226, 232, 240, 0.78)', fontSize: 12 }}
              width={80}
            />
            <Tooltip
              cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
              contentStyle={{
                background: '#0f172a',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                borderRadius: 12,
              }}
            />
            <Bar dataKey="value" radius={[0, 12, 12, 0]} fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    case 'progress': {
      const percent = Math.max(0, Math.min(1, visualization.value / 100));
      const benchmarkPercent = visualization.benchmark ? visualization.benchmark / 100 : undefined;

      return (
        <div style={{ width: '100%' }}>
          <MetricMeter>
            <MetricBar $percent={percent} />
          </MetricMeter>
          {benchmarkPercent !== undefined ? (
            <div
              style={{
                marginTop: '0.35rem',
                fontSize: '0.75rem',
                color: 'rgba(148, 163, 184, 0.75)',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Current</span>
              <span>Team avg {Math.round(benchmarkPercent * 100)}%</span>
            </div>
          ) : null}
        </div>
      );
    }
    case 'histogram': {
      const data = visualization.buckets.map((bucket) => ({
        label: bucket.label,
        value: bucket.value,
      }));

      return (
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis dataKey="label" stroke="rgba(148, 163, 184, 0.75)" fontSize={12} />
            <YAxis stroke="rgba(148, 163, 184, 0.75)" fontSize={12} />
            <Tooltip
              cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
              contentStyle={{
                background: '#0f172a',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: 12,
              }}
            />
            <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    case 'line': {
      const data = visualization.points;

      return (
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis dataKey="label" stroke="rgba(148, 163, 184, 0.75)" fontSize={12} />
            <YAxis stroke="rgba(148, 163, 184, 0.75)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: 12,
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    case 'scatter': {
      const data = visualization.points.map((point, index) => ({
        ...point,
        index,
      }));

      return (
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 10, right: 16, left: -8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis type="number" dataKey="x" name="Earned" stroke="rgba(148, 163, 184, 0.75)" />
            <YAxis type="number" dataKey="y" name="Converted" stroke="rgba(148, 163, 184, 0.75)" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                background: '#0f172a',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: 12,
              }}
              formatter={(_, __, payload) => [payload?.payload.label ?? 'Match', '']}
            />
            <Scatter data={data} fill="#facc15" />
          </ScatterChart>
        </ResponsiveContainer>
      );
    }
    case 'radar': {
      const data = visualization.axes.map((entry) => ({ ...entry }));

      return (
        <ResponsiveContainer>
          <RadarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <PolarGrid stroke="rgba(148, 163, 184, 0.25)" />
            <PolarAngleAxis dataKey="label" stroke="rgba(226, 232, 240, 0.8)" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(148, 163, 184, 0.5)" tick={false} />
            <Radar dataKey="value" stroke="#34d399" fill="#34d399" fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      );
    }
    case 'timeline': {
      const data = visualization.points;

      return (
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id={`timeline-${axis.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f472b6" stopOpacity={0.75} />
                <stop offset="95%" stopColor="#f472b6" stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(148, 163, 184, 0.18)" />
            <XAxis dataKey="label" stroke="rgba(148, 163, 184, 0.75)" fontSize={12} />
            <YAxis stroke="rgba(148, 163, 184, 0.75)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid rgba(236, 72, 153, 0.35)',
                borderRadius: 12,
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#f472b6" fill={`url(#timeline-${axis.id})`} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      );
    }
    case 'boxplot': {
      const { min, q1, median, q3, max } = visualization.distribution;
      const range = Math.max(1, max - min);
      const normalize = (value: number) => ((value - min) / range) * 100;

      return (
        <BoxPlotWrapper>
          <BoxPlotTrack />
          <BoxPlotWhisker $position={0} />
          <BoxPlotWhisker $position={100} />
          <BoxPlotBox $start={normalize(q1)} $width={Math.max(4, normalize(q3) - normalize(q1))} />
          <BoxPlotMedian $position={normalize(median)} />
        </BoxPlotWrapper>
      );
    }
    default:
      return (
        <div style={{ color: 'rgba(148, 163, 184, 0.65)', fontSize: '0.85rem' }}>
          Visualization coming soon for this axis.
        </div>
      );
  }
};

const renderMetricMeter = (percent?: number, trend?: FaultlineAxis['metrics'][number]['trend']) => {
  if (typeof percent !== 'number') {
    return null;
  }

  const normalized = Math.max(0, Math.min(1, percent));
  const tone = trend === 'down' ? 'negative' : 'positive';

  return (
    <MetricMeter>
      <MetricBar $percent={normalized} $tone={tone} />
    </MetricMeter>
  );
};

const toneMeta: Record<'strong' | 'steady' | 'caution', { label: string; tagline: string; summary: string }> = {
  strong: {
    label: 'Power signal',
    tagline: 'Lean into this advantage to stretch your leads.',
    summary: 'Recent clashes show this axis consistently outperforming peers — keep reinforcing the habits that drive it.',
  },
  steady: {
    label: 'Stable footing',
    tagline: 'Reliable output with room to sharpen.',
    summary: 'You have a dependable baseline here; refine routines and micro-adjustments to elevate it into a win condition.',
  },
  caution: {
    label: 'Fragile faultline',
    tagline: 'Shore this up before it swings matches.',
    summary: 'Instability in this axis is leaking momentum — review reps and set targeted drills to stabilise it.',
  },
};

const renderAxisCard = (axis: FaultlineAxis) => {
  const tone = determineTone(axis.score);
  const toneContext = toneMeta[tone];
  const strengths = axis.metrics.filter((metric) => metric.trend === 'up');
  const risks = axis.metrics.filter((metric) => metric.trend === 'down');
  const steadySignals = axis.metrics.filter((metric) => metric.trend !== 'up' && metric.trend !== 'down');

  type MetricGroup = {
    key: string;
    label: string;
    variant: 'positive' | 'negative' | 'neutral';
    emptyCopy: string;
    metrics: FaultlineAxis['metrics'];
  };

  const baseMetricGroups: MetricGroup[] = [
    {
      key: 'strengths',
      label: 'Signals to lean into',
      variant: 'positive',
      emptyCopy: 'No standout strengths surfaced yet — keep stacking consistent games to raise the ceiling.',
      metrics: strengths,
    },
    {
      key: 'risks',
      label: 'Pressure points to stabilise',
      variant: 'negative',
      emptyCopy: 'No critical risks detected. Stay vigilant when matchups or patches shift.',
      metrics: risks,
    },
    {
      key: 'steady',
      label: 'Steady signals',
      variant: 'neutral',
      emptyCopy: 'We expect these metrics to move once you gather a broader match sample.',
      metrics: steadySignals,
    },
  ];

  const metricGroups = baseMetricGroups.filter((group) => group.metrics.length > 0 || group.key === 'steady');

  const renderMetricGroup = (
    label: string,
    variant: 'positive' | 'negative' | 'neutral',
    metrics: FaultlineAxis['metrics'],
    emptyCopy: string,
  ) => (
    <SignalColumn $variant={variant}>
      <SignalHeading $variant={variant}>{label}</SignalHeading>
      {metrics.length > 0 ? (
        <MetricList>
          {metrics.map((metric) => (
            <li key={metric.id}>
              <MetricItem>
                <MetricLabel>
                  {metric.label}
                  {metric.unit ? <MetricUnit>{metric.unit}</MetricUnit> : null}
                </MetricLabel>
                <MetricValue $trend={metric.trend}>{metric.formattedValue}</MetricValue>
              </MetricItem>
              {renderMetricMeter(
                typeof metric.percent === 'number' ? metric.percent : undefined,
                metric.trend,
              )}
            </li>
          ))}
        </MetricList>
      ) : (
        <SignalEmpty>{emptyCopy}</SignalEmpty>
      )}
    </SignalColumn>
  );

  return (
    <AxisCard key={axis.id}>
      <AxisHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          <AxisTitle>{axis.title}</AxisTitle>
          <AxisScoreContext>
            <span>{toneContext.label}</span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'rgba(148, 163, 184, 0.75)' }}>
              {toneContext.tagline}
            </span>
          </AxisScoreContext>
        </div>
        <AxisScoreBadge $tone={tone}>{Math.round(axis.score)}</AxisScoreBadge>
      </AxisHeader>
      <AxisBody>
        <AxisVisualPanel>
          <AxisVisualizationPanel>
            <AxisVisualizationTitle>Data spotlight</AxisVisualizationTitle>
            <AxisVisualization>{renderVisualization(axis)}</AxisVisualization>
          </AxisVisualizationPanel>
          <AxisSection>
            <AxisSectionTitle>Signals to review</AxisSectionTitle>
            <AxisSignals>
              {metricGroups.map((group) =>
                renderMetricGroup(group.label, group.variant, group.metrics, group.emptyCopy),
              )}
            </AxisSignals>
          </AxisSection>
        </AxisVisualPanel>
        <AxisNarrativePanel>
          <AxisSection>
            <AxisSectionTitle>Quick interpretation</AxisSectionTitle>
            <AxisSectionText>{toneContext.summary}</AxisSectionText>
          </AxisSection>

          <AxisSection>
            <AxisSectionTitle>What we measured</AxisSectionTitle>
            <AxisDescription>{axis.description}</AxisDescription>
          </AxisSection>

          <AxisSection>
            <AxisSectionTitle>How you&apos;re trending</AxisSectionTitle>
            <AxisInsight>{axis.insight}</AxisInsight>
          </AxisSection>

          <AxisSection>
            <AxisSectionTitle>Telemetry considered</AxisSectionTitle>
            <DerivedFromList>
              {axis.derivedFrom.map((source) => (
                <DerivedFromItem key={`${axis.id}-${source}`}>{source}</DerivedFromItem>
              ))}
            </DerivedFromList>
          </AxisSection>
        </AxisNarrativePanel>
      </AxisBody>
    </AxisCard>
  );
};

export const FaultlinesDashboard: React.FC<FaultlinesDashboardProps> = ({
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
      <FaultlinesLayout>
        <FaultlinesHeader>
          <FaultlinesHeaderTop>
            <div>
              <FaultlinesTitle>Faultlines Diagnostic</FaultlinesTitle>
              <FaultlinesSubtitle>
                Surfacing where your gameplay shows fractures versus unshakeable strengths across combat, objectives, discipline, and nerve.
              </FaultlinesSubtitle>
            </div>
            <SyncHeader lastSyncTime={lastSyncTime} onSync={onSync} />
          </FaultlinesHeaderTop>
        </FaultlinesHeader>
        <FaultlinesContent>
          <LoadingCard>Aligning data streams and probing your last 20 clashes…</LoadingCard>
        </FaultlinesContent>
      </FaultlinesLayout>
    );
  }

  if (error) {
    return (
      <FaultlinesLayout>
        <FaultlinesHeader>
          <FaultlinesHeaderTop>
            <div>
              <FaultlinesTitle>Faultlines Diagnostic</FaultlinesTitle>
              <FaultlinesSubtitle>
                A cross-axis audit of combat efficiency, objective stewardship, survival discipline, vision, economy and psychological momentum.
              </FaultlinesSubtitle>
            </div>
            <SyncHeader lastSyncTime={lastSyncTime} onSync={onSync} />
          </FaultlinesHeaderTop>
        </FaultlinesHeader>
        <FaultlinesContent>
          <PlaceholderState>{error}</PlaceholderState>
        </FaultlinesContent>
      </FaultlinesLayout>
    );
  }

  if (!summary) {
    const infoTitle = status === 'NO_MATCHES' ? 'Need more battles to chart your faultlines.' : 'Faultlines not yet mapped';
    const infoMessage = message ?? 'Play additional matches or sync your Summoner profile to expose structural strengths and gaps.';

    return (
      <FaultlinesLayout>
        <FaultlinesHeader>
          <FaultlinesHeaderTop>
            <div>
              <FaultlinesTitle>Faultlines Diagnostic</FaultlinesTitle>
              <FaultlinesSubtitle>
                We analyse objective control, discipline, vision, economy, and emotional resilience to chart your most persistent patterns.
              </FaultlinesSubtitle>
            </div>
            <SyncHeader lastSyncTime={lastSyncTime} onSync={onSync} />
          </FaultlinesHeaderTop>
        </FaultlinesHeader>
        <FaultlinesContent>
          <PlaceholderState>
            <strong style={{ display: 'block', marginBottom: '0.6rem', color: '#fcd34d' }}>{infoTitle}</strong>
            {infoMessage}
          </PlaceholderState>
        </FaultlinesContent>
      </FaultlinesLayout>
    );
  }

  return (
    <FaultlinesLayout>
      <FaultlinesHeader>
        <FaultlinesHeaderTop>
          <div>
            <FaultlinesTitle>Faultlines Diagnostic</FaultlinesTitle>
            <FaultlinesSubtitle>
              A cross-axis audit of combat efficiency, objective stewardship, survival discipline, vision, economy and psychological momentum.
            </FaultlinesSubtitle>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <SyncHeader lastSyncTime={lastSyncTime} onSync={onSync} />
          </div>
        </FaultlinesHeaderTop>
      </FaultlinesHeader>

      <FaultlinesContent>
        <AxisGrid>
          {summary.axes.map((axis) => renderAxisCard(axis))}
        </AxisGrid>
      </FaultlinesContent>
    </FaultlinesLayout>
  );
};
