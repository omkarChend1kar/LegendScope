import React from 'react';
import {
  DefiningMatchSection,
  ChampionIcon,
  MatchDetails,
  MatchTitle,
  MatchDate,
  MatchStats,
} from '../styles/DefiningMatch.styles';
import type { DefiningMatch } from '../../domain/entities/DefiningMatch';
import { Trophy } from 'lucide-react';

interface DefiningMatchCardProps {
  match: DefiningMatch;
}

export const DefiningMatchCard: React.FC<DefiningMatchCardProps> = ({ match }) => {
  return (
    <DefiningMatchSection>
      <ChampionIcon>
        <Trophy size={32} color="#fbbf24" />
      </ChampionIcon>
      <MatchDetails>
        <MatchTitle>{match.title}</MatchTitle>
        <MatchDate>{match.date}</MatchDate>
        <MatchStats>
          <span>{match.formattedDamage} damage</span>
          <span>{match.gameMode}</span>
        </MatchStats>
      </MatchDetails>
    </DefiningMatchSection>
  );
};
