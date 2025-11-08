import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

type ChartDatumValue = string | number | null | undefined;
type ChartDatum = Record<string, ChartDatumValue>;

interface TooltipPayloadItem {
  name?: string;
  value?: ChartDatumValue;
  color?: string;
}

interface TooltipContext {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
}

interface BaseChartProps {
  data: ChartDatum[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

interface LineChartProps extends BaseChartProps {
  type: 'line';
  xKey: string;
  yKey: string;
  color?: string;
}

interface AreaChartProps extends BaseChartProps {
  type: 'area';
  xKey: string;
  yKey: string;
  color?: string;
  gradient?: boolean;
}

interface BarChartProps extends BaseChartProps {
  type: 'bar';
  xKey: string;
  yKey: string;
  color?: string;
}

interface PieChartProps extends BaseChartProps {
  type: 'pie';
  dataKey: string;
  nameKey: string;
  colors?: string[];
}

interface RadarChartProps extends BaseChartProps {
  type: 'radar';
  subjects: string[];
  dataKey: string;
  color?: string;
}

type ChartProps = 
  | LineChartProps 
  | AreaChartProps 
  | BarChartProps 
  | PieChartProps 
  | RadarChartProps;

const ChartContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  
  .recharts-tooltip-wrapper {
    .recharts-default-tooltip {
      background: ${theme.colors.gradients.card} !important;
      border: 2px solid ${theme.colors.primary.gold} !important;
      border-radius: ${theme.borderRadius.lg} !important;
      box-shadow: ${theme.shadows.lg} !important;
      color: ${theme.colors.neutral.lightGray} !important;
    }
  }
  
  .recharts-legend-wrapper {
    .recharts-default-legend {
      .recharts-legend-item {
        color: ${theme.colors.neutral.lightGray} !important;
      }
    }
  }
`;

const CustomTooltip: React.FC<TooltipContext> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: theme.colors.gradients.card,
        border: `2px solid ${theme.colors.primary.gold}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.sm,
        boxShadow: theme.shadows.lg,
      }}>
        <p style={{ color: theme.colors.primary.lightGold, margin: '0 0 8px 0' }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ 
            color: entry.color || theme.colors.neutral.lightGray,
            margin: '4px 0' 
          }}>
            {`${entry.name ?? 'Value'}: ${entry.value ?? '--'}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const Chart: React.FC<ChartProps> = ({
  type,
  data,
  height = 300,
  showGrid = true,
  showLegend = true,
  ...props
}) => {
  const commonProps = {
    width: '100%' as const,
    height,
    data,
  };

  const axisStyle = {
    fontSize: 12,
    fill: theme.colors.neutral.lightGray,
  };

  const gridStyle = {
    stroke: theme.colors.neutral.darkGray,
    strokeOpacity: 0.3,
  };

  const renderChart = () => {
    switch (type) {
      case 'line': {
        const lineProps = props as Omit<LineChartProps, 'type'>;
        return (
          <ResponsiveContainer {...commonProps}>
            <LineChart data={data}>
              {showGrid && <CartesianGrid {...gridStyle} />}
              <XAxis 
                dataKey={lineProps.xKey} 
                axisLine={false}
                tickLine={false}
                style={axisStyle}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                style={axisStyle}
              />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey={lineProps.yKey}
                stroke={lineProps.color || theme.colors.primary.gold}
                strokeWidth={3}
                dot={{ fill: lineProps.color || theme.colors.primary.gold, strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: theme.colors.primary.lightGold, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      }

      case 'area': {
        const areaProps = props as Omit<AreaChartProps, 'type'>;
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={data}>
              {showGrid && <CartesianGrid {...gridStyle} />}
              <XAxis 
                dataKey={areaProps.xKey}
                axisLine={false}
                tickLine={false}
                style={axisStyle}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                style={axisStyle}
              />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={areaProps.color || theme.colors.primary.gold} 
                    stopOpacity={0.8}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={areaProps.color || theme.colors.primary.gold} 
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey={areaProps.yKey}
                stroke={areaProps.color || theme.colors.primary.gold}
                fillOpacity={1}
                fill={areaProps.gradient ? "url(#areaGradient)" : areaProps.color || theme.colors.primary.gold}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      }

      case 'bar': {
        const barProps = props as Omit<BarChartProps, 'type'>;
        return (
          <ResponsiveContainer {...commonProps}>
            <BarChart data={data}>
              {showGrid && <CartesianGrid {...gridStyle} />}
              <XAxis 
                dataKey={barProps.xKey}
                axisLine={false}
                tickLine={false}
                style={axisStyle}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                style={axisStyle}
              />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
              <Bar 
                dataKey={barProps.yKey} 
                fill={barProps.color || theme.colors.primary.gold}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      }

      case 'pie': {
        const pieProps = props as Omit<PieChartProps, 'type'>;
        const colors = pieProps.colors || [
          theme.colors.primary.gold,
          theme.colors.accent.ethereal,
          theme.colors.secondary.indigoMist,
          theme.colors.roles.adc,
          theme.colors.roles.support,
        ];
        
        return (
          <ResponsiveContainer {...commonProps}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey={pieProps.dataKey}
                nameKey={pieProps.nameKey}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
      }

      case 'radar': {
        const radarProps = props as Omit<RadarChartProps, 'type'>;
        return (
          <ResponsiveContainer {...commonProps}>
            <RadarChart data={data}>
              <PolarGrid stroke={theme.colors.neutral.darkGray} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: theme.colors.neutral.lightGray, fontSize: 12 }}
              />
              <PolarRadiusAxis 
                tick={{ fill: theme.colors.neutral.lightGray, fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="Score"
                dataKey={radarProps.dataKey}
                stroke={radarProps.color || theme.colors.primary.gold}
                fill={radarProps.color || theme.colors.primary.gold}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        );
      }

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <ChartContainer height={height}>
      {renderChart()}
    </ChartContainer>
  );
};