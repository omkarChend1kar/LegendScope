import React from 'react';
import {
  SummaryContent,
  SectionCard,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SummaryLabel,
  SummaryValue,
} from '../styles/Summary.styles';

interface HistoricalInsightsPlaceholderProps {
  playerId: string;
}

export const HistoricalInsightsPlaceholder: React.FC<HistoricalInsightsPlaceholderProps> = ({
  playerId,
}) => {
  return (
    <SummaryContent>
      <SectionCard>
        <SectionHeader>
          <SectionTitle>Historical Insights</SectionTitle>
          <SectionSubtitle>We\'re compiling multi-patch analytics for you.</SectionSubtitle>
        </SectionHeader>
        <p style={{ margin: 0 }}>
          We\'re still training the Hextech archives for <strong>{playerId}</strong>. Soon you\'ll see:
        </p>
        <ul style={{ marginTop: '1rem', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
          <li>Meta trends and matchup breakdowns across recent patches.</li>
          <li>Champion mastery trajectories with milestone callouts.</li>
          <li>Comparisons against friends and regional ladders.</li>
        </ul>
        <SummaryLabel>Want early access?</SummaryLabel>
        <SummaryValue>Enable notifications and we\'ll ping you once it\'s live.</SummaryValue>
      </SectionCard>
    </SummaryContent>
  );
};
