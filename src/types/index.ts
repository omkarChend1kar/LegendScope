// Player and Champion Types
export interface Player {
  id: string;
  summonerName: string;
  puuid: string;
  profileIconId: number;
  summonerLevel: number;
  region: string;
  tier?: string;
  rank?: string;
  leaguePoints?: number;
}

export interface Champion {
  id: string;
  name: string;
  title: string;
  key: string;
  tags: string[];
  image: {
    full: string;
    sprite: string;
  };
}

// Match and Game Data Types
export interface Match {
  matchId: string;
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  gameType: string;
  queueId: number;
  participants: Participant[];
}

export interface Participant {
  puuid: string;
  summonerName: string;
  championId: number;
  championName: string;
  role: string;
  lane: string;
  kills: number;
  deaths: number;
  assists: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  goldEarned: number;
  cs: number;
  visionScore: number;
  win: boolean;
  items: number[];
  summoners: number[];
  runes: RuneSelection[];
}

export interface RuneSelection {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

// Analytics and Insights Types
export interface PlayerInsights {
  playerId: string;
  strengths: Strength[];
  weaknesses: Weakness[];
  preferredRoles: RolePreference[];
  championMastery: ChampionMastery[];
  playstyle: PlaystyleAnalysis;
  lastUpdated: number;
}

export interface Strength {
  category: 'mechanical' | 'strategic' | 'teamwork' | 'positioning';
  description: string;
  score: number; // 0-100
  evidence: string[];
  trend: 'improving' | 'stable' | 'declining';
}

export interface Weakness {
  category: 'mechanical' | 'strategic' | 'teamwork' | 'positioning';
  description: string;
  severity: 'low' | 'medium' | 'high';
  suggestions: string[];
  trend: 'improving' | 'stable' | 'worsening';
}

export interface RolePreference {
  role: 'top' | 'jungle' | 'mid' | 'adc' | 'support';
  preference: number; // 0-100
  winRate: number;
  gamesPlayed: number;
  averagePerformance: number;
}

export interface ChampionMastery {
  championId: number;
  championName: string;
  masteryLevel: number;
  masteryPoints: number;
  gamesPlayed: number;
  winRate: number;
  averageKDA: number;
  lastPlayed: number;
}

export interface PlaystyleAnalysis {
  aggressive: number; // 0-100
  supportive: number; // 0-100
  strategic: number; // 0-100
  mechanical: number; // 0-100
  teamFight: number; // 0-100
  splitPush: number; // 0-100
  vision: number; // 0-100
  objective: number; // 0-100
}

// Progress and Historical Data Types
export interface ProgressData {
  playerId: string;
  timeframe: TimeFrame;
  rankProgress: RankProgress[];
  skillProgress: SkillProgress[];
  championProgress: ChampionProgress[];
}

export interface RankProgress {
  date: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  winRate: number;
  gamesPlayed: number;
}

export interface SkillProgress {
  date: string;
  skill: string;
  score: number;
  change: number;
}

export interface ChampionProgress {
  championId: number;
  championName: string;
  periods: {
    date: string;
    winRate: number;
    averageKDA: number;
    gamesPlayed: number;
  }[];
}

// Year-End Summary Types
export interface YearEndSummary {
  playerId: string;
  year: number;
  totalGames: number;
  totalWins: number;
  overallWinRate: number;
  mostPlayedChampions: ChampionStats[];
  biggestImprovements: Improvement[];
  highlightMatches: HighlightMatch[];
  friendComparisons: FriendComparison[];
  achievements: Achievement[];
  rankJourney: RankJourney;
}

export interface ChampionStats {
  championId: number;
  championName: string;
  gamesPlayed: number;
  winRate: number;
  averageKDA: number;
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
}

export interface Improvement {
  category: string;
  description: string;
  percentageChange: number;
  beforeValue: number;
  afterValue: number;
  timeframe: string;
}

export interface HighlightMatch {
  matchId: string;
  date: string;
  championPlayed: string;
  gameMode: string;
  result: 'victory' | 'defeat';
  kda: string;
  reason: string;
  highlights: string[];
}

export interface FriendComparison {
  friendId: string;
  friendName: string;
  comparison: {
    category: string;
    playerValue: number;
    friendValue: number;
    difference: number;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedDate: string;
  category: string;
}

export interface LeagueEntry {
  queueType: string;
  tier: Tier;
  rank: Rank;
  leaguePoints: number;
  wins?: number;
  losses?: number;
}

export interface RankJourney {
  startRank: {
    tier: string;
    rank: string;
    lp: number;
  };
  endRank: {
    tier: string;
    rank: string;
    lp: number;
  };
  peakRank: {
    tier: string;
    rank: string;
    lp: number;
    date: string;
  };
  rankChanges: {
    date: string;
    tier: string;
    rank: string;
    lp: number;
    change: 'promotion' | 'demotion' | 'lp_gain' | 'lp_loss';
  }[];
}

// Social Features Types
export interface SocialPost {
  id: string;
  playerId: string;
  type: 'achievement' | 'highlight' | 'improvement' | 'comparison';
  content: string;
  imageUrl?: string;
  data: Record<string, string | number | boolean | null | undefined | string[] | number[]>;
  platform: 'twitter' | 'discord' | 'reddit' | 'instagram';
  createdAt: string;
  likes: number;
  shares: number;
}

export interface Friend {
  id: string;
  summonerName: string;
  relationship: 'friend' | 'rival' | 'duo_partner';
  addedDate: string;
  mutualFriends: string[];
  compatibility: PlaystyleCompatibility;
}

export interface PlaystyleCompatibility {
  overallScore: number; // 0-100
  roleCompatibility: {
    role: string;
    score: number;
  }[];
  playstyleMatch: {
    category: string;
    compatibility: number;
  }[];
  recommendedDuoLane: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  error?: string;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

// Utility Types
export type TimeFrame = 'day' | 'week' | 'month' | 'season' | 'year' | 'all';
export type GameMode = 'ranked_solo' | 'ranked_flex' | 'normal' | 'aram' | 'tft' | 'all';
export type Region = 'na1' | 'euw1' | 'eun1' | 'kr' | 'br1' | 'la1' | 'la2' | 'oc1' | 'ru' | 'tr1' | 'jp1';
export type Tier = 'IRON' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'EMERALD' | 'DIAMOND' | 'MASTER' | 'GRANDMASTER' | 'CHALLENGER';
export type Rank = 'IV' | 'III' | 'II' | 'I';