import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../echoes-of-battle/presentation/styles/designTokens';

const FormattedContent = styled.div`
  margin: 0;
  color: rgba(226, 232, 240, 0.95);
  font-size: ${designTokens.typography.fontSize.sm};
  line-height: 1.7;
  word-wrap: break-word;
`;

const Section = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  color: rgba(251, 191, 36, 0.98);
  font-weight: ${designTokens.typography.fontWeight.semibold};
  margin-bottom: 0.5rem;
  font-size: ${designTokens.typography.fontSize.sm};
  letter-spacing: 0.01em;
`;

const SectionContent = styled.div`
  color: rgba(226, 232, 240, 0.92);
  line-height: 1.65;
  padding-left: 0.75rem;
  border-left: 2px solid rgba(96, 165, 250, 0.25);
`;

const Metric = styled.span`
  color: rgba(96, 165, 250, 0.95);
  font-weight: ${designTokens.typography.fontWeight.medium};
  white-space: nowrap;
`;

const ChampionName = styled.span`
  color: rgba(192, 132, 252, 0.95);
  font-weight: ${designTokens.typography.fontWeight.medium};
`;

interface FormattedMessageProps {
  content: string;
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({ content }) => {
  // Parse structured content with **header:** format
  const parseStructuredContent = (text: string) => {
    // Split by lines and identify sections
    const lines = text.split('\n').filter(line => line.trim());
    const sections: Array<{ header: string; content: string }> = [];
    
    lines.forEach(line => {
      // Match pattern: **1. Header:** content or **Header:** content
      const match = line.match(/^\*\*(\d+\.\s*)?(.+?):\*\*\s*(.+)$/);
      if (match) {
        sections.push({
          header: match[2].trim(),
          content: match[3].trim(),
        });
      }
    });
    
    return sections.length > 0 ? sections : null;
  };

  // Format inline text (metrics, champions, etc.)
  const formatInlineText = (text: string) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Match percentages, KDA, scores, ratios
    const metricRegex = /(\d+\.?\d*%|\d+\/\d+\/\d+|\d+\.?\d*\s*KDA|\d+\s*(?:wins?|losses?|games?|CS|Baron|Dragon)|\d+@\d+)/g;
    
    // Match champion names (capitalized words)
    const championRegex = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/g;

    // First pass: highlight metrics
    let match: RegExpExecArray | null;
    const metricsPositions: Array<{ start: number; end: number; type: string }> = [];
    
    while ((match = metricRegex.exec(text)) !== null) {
      metricsPositions.push({
        start: match.index,
        end: match.index + match[0].length,
        type: 'metric'
      });
    }

    // Second pass: highlight champions (avoid overlapping with metrics)
    metricRegex.lastIndex = 0;
    while ((match = championRegex.exec(text)) !== null) {
      const championName = match[1];
      const matchIndex = match.index;
      // Check if this is a known champion name (basic list)
      const champions = ['Azir', 'Orianna', 'Yone', 'Zac', 'Baron', 'Dragon'];
      if (champions.includes(championName)) {
        const overlaps = metricsPositions.some(
          pos => matchIndex >= pos.start && matchIndex < pos.end
        );
        if (!overlaps) {
          metricsPositions.push({
            start: matchIndex,
            end: matchIndex + match[0].length,
            type: 'champion'
          });
        }
      }
    }

    // Sort by position
    metricsPositions.sort((a, b) => a.start - b.start);

    // Build the formatted text
    metricsPositions.forEach((pos, index) => {
      // Add text before this match
      if (pos.start > lastIndex) {
        parts.push(text.substring(lastIndex, pos.start));
      }

      // Add the formatted match
      const matchText = text.substring(pos.start, pos.end);
      if (pos.type === 'metric') {
        parts.push(<Metric key={`metric-${index}`}>{matchText}</Metric>);
      } else if (pos.type === 'champion') {
        parts.push(<ChampionName key={`champion-${index}`}>{matchText}</ChampionName>);
      }

      lastIndex = pos.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const sections = parseStructuredContent(content);

  if (sections) {
    // Render as structured sections
    return (
      <FormattedContent>
        {sections.map((section, index) => (
          <Section key={index}>
            <SectionHeader>
              {index + 1}. {section.header}
            </SectionHeader>
            <SectionContent>
              {formatInlineText(section.content)}
            </SectionContent>
          </Section>
        ))}
      </FormattedContent>
    );
  }

  // Fallback: render as formatted plain text
  return (
    <FormattedContent>
      {formatInlineText(content)}
    </FormattedContent>
  );
};
