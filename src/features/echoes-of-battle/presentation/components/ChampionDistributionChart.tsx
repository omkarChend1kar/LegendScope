import React from 'react';
import {
  ChartCard,
  ChartTitle,
  DonutChartContainer,
  DonutChart,
  ChartLegend,
  LegendItem,
  LegendColor,
  LegendLabel,
  LegendValue,
} from '../styles/Charts.styles';
import type { ChampionDistribution } from '../../domain/entities/ChampionDistribution';

interface ChampionDistributionChartProps {
  distribution: ChampionDistribution;
}

export const ChampionDistributionChart: React.FC<ChampionDistributionChartProps> = ({ distribution }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <ChartCard>
      <ChartTitle>Champion Distribution</ChartTitle>
      <DonutChartContainer>
        <DonutChart viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="20"
          />
          {distribution.champions.map((champion, index) => {
            const strokeLength = (champion.percentage / 100) * circumference;
            let offset = 0;
            for (let i = 0; i < index; i++) {
              offset += (distribution.champions[i].percentage / 100) * circumference;
            }

            return (
              <circle
                key={champion.name}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={champion.color}
                strokeWidth="20"
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={-offset}
                style={{ transition: 'all 0.3s ease' }}
              />
            );
          })}
        </DonutChart>
      </DonutChartContainer>
      <ChartLegend>
        {distribution.champions.map((champion) => (
          <LegendItem key={champion.name}>
            <LegendColor $color={champion.color} />
            <LegendLabel>{champion.name}</LegendLabel>
            <LegendValue>{champion.percentage}%</LegendValue>
          </LegendItem>
        ))}
      </ChartLegend>
    </ChartCard>
  );
};
