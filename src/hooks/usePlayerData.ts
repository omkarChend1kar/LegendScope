import { useState, useEffect, useCallback } from 'react';
import { usePlayerStore } from '../store';
import { riotApiService, analyticsService } from '../services/api';
import type { Player, PlayerInsights, ProgressData, YearEndSummary, Region, TimeFrame } from '../types';

interface UsePlayerDataReturn {
  player: Player | null;
  insights: PlayerInsights | null;
  progressData: ProgressData | null;
  yearEndSummary: YearEndSummary | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  searchPlayer: (summonerName: string, region: Region) => Promise<boolean>;
}

export const usePlayerData = (): UsePlayerDataReturn => {
  const {
    currentPlayer,
    insights,
    progressData,
    yearEndSummary,
    selectedTimeframe,

    loadingState,
    setCurrentPlayer,
    setInsights,
    setProgressData,
    setYearEndSummary,
    setLoading,
    setError,
    clearError,
  } = usePlayerStore();

  const [localLoading, setLocalLoading] = useState(false);

  const searchPlayer = useCallback(async (summonerName: string, region: Region): Promise<boolean> => {
    setLocalLoading(true);
    setLoading(true);
    clearError();

    try {
      // Get basic player data
      const playerResponse = await riotApiService.getPlayerByName(summonerName, region);
      
      if (!playerResponse.success) {
        setError(playerResponse.error || 'Failed to find player');
        return false;
      }

      // Get rank data
      const rankResponse = await riotApiService.getPlayerRank(playerResponse.data.id, region);
      
      if (rankResponse.success && rankResponse.data.length > 0) {
        const soloQueueRank = rankResponse.data.find((entry: any) => 
          entry.queueType === 'RANKED_SOLO_5x5'
        );
        
        if (soloQueueRank) {
          playerResponse.data.tier = soloQueueRank.tier;
          playerResponse.data.rank = soloQueueRank.rank;
          playerResponse.data.leaguePoints = soloQueueRank.leaguePoints;
        }
      }

      setCurrentPlayer(playerResponse.data);
      return true;
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
      return false;
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  }, [setCurrentPlayer, setLoading, setError, clearError]);

  const fetchPlayerInsights = useCallback(async (player: Player) => {
    if (!player.puuid) return;

    try {
      // Get recent match history first
      const matchHistoryResponse = await riotApiService.getMatchHistory(
        player.puuid, 
        player.region as Region, 
        20
      );

      if (matchHistoryResponse.success) {
        // Fetch match details (simplified - in real app you'd fetch all matches)
        const matches: any[] = []; // Would populate with actual match data
        
        // Generate insights based on match data
        const insightsResponse = await analyticsService.generatePlayerInsights(
          player.puuid, 
          matches
        );

        if (insightsResponse.success) {
          setInsights(insightsResponse.data);
        }
      }
    } catch (error: any) {
      console.error('Error fetching player insights:', error);
    }
  }, [setInsights]);

  const fetchProgressData = useCallback(async (player: Player, timeframe: TimeFrame) => {
    if (!player.puuid) return;

    try {
      const progressResponse = await analyticsService.generateProgressData(
        player.puuid, 
        timeframe
      );

      if (progressResponse.success) {
        setProgressData(progressResponse.data);
      }
    } catch (error: any) {
      console.error('Error fetching progress data:', error);
    }
  }, [setProgressData]);

  const fetchYearEndSummary = useCallback(async (player: Player, year: number) => {
    if (!player.puuid) return;

    try {
      const summaryResponse = await analyticsService.generateYearEndSummary(
        player.puuid, 
        year
      );

      if (summaryResponse.success) {
        setYearEndSummary(summaryResponse.data);
      }
    } catch (error: any) {
      console.error('Error fetching year-end summary:', error);
    }
  }, [setYearEndSummary]);

  const refetch = useCallback(async () => {
    if (!currentPlayer) return;

    setLoading(true);
    clearError();

    try {
      await Promise.all([
        fetchPlayerInsights(currentPlayer),
        fetchProgressData(currentPlayer, selectedTimeframe),
        fetchYearEndSummary(currentPlayer, new Date().getFullYear()),
      ]);
    } catch (error: any) {
      setError(error.message || 'Error refreshing data');
    } finally {
      setLoading(false);
    }
  }, [
    currentPlayer,
    selectedTimeframe,
    fetchPlayerInsights,
    fetchProgressData,
    fetchYearEndSummary,
    setLoading,
    setError,
    clearError,
  ]);

  // Auto-fetch data when player changes
  useEffect(() => {
    if (currentPlayer && !insights) {
      fetchPlayerInsights(currentPlayer);
    }
  }, [currentPlayer, insights, fetchPlayerInsights]);

  useEffect(() => {
    if (currentPlayer && selectedTimeframe) {
      fetchProgressData(currentPlayer, selectedTimeframe);
    }
  }, [currentPlayer, selectedTimeframe, fetchProgressData]);

  useEffect(() => {
    if (currentPlayer && !yearEndSummary) {
      fetchYearEndSummary(currentPlayer, new Date().getFullYear());
    }
  }, [currentPlayer, yearEndSummary, fetchYearEndSummary]);

  return {
    player: currentPlayer,
    insights,
    progressData,
    yearEndSummary,
    isLoading: loadingState.isLoading || localLoading,
    error: loadingState.error,
    refetch,
    searchPlayer,
  };
};

// Hook for social features
export const useSocialFeatures = () => {
  const { friends, addFriend, removeFriend } = usePlayerStore();
  const [isLoading, setIsLoading] = useState(false);

  const sendFriendRequest = useCallback(async (summonerName: string, region: Region) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would send a request to your backend
      const playerResponse = await riotApiService.getPlayerByName(summonerName, region);
      
      if (playerResponse.success) {
        const friend = {
          id: playerResponse.data.id,
          summonerName: playerResponse.data.summonerName,
          relationship: 'friend' as const,
          addedDate: new Date().toISOString(),
          mutualFriends: [],
          compatibility: {
            overallScore: Math.floor(Math.random() * 40) + 60, // Mock compatibility
            roleCompatibility: [],
            playstyleMatch: [],
            recommendedDuoLane: [],
          },
        };
        
        addFriend(friend);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error adding friend:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [addFriend]);

  const generateShareableContent = useCallback((type: 'achievement' | 'highlight' | 'improvement', data: any) => {
    // Generate shareable content for social platforms
    const templates = {
      achievement: `🏆 Just unlocked a new achievement in League of Legends! ${data.title} - ${data.description} #LeagueOfLegends #Gaming`,
      highlight: `⚔️ Amazing game highlight! ${data.champion} - ${data.kda} KDA in a ${data.result} match! #LeagueOfLegends #Highlight`,
      improvement: `📈 My ${data.skill} improved by ${data.change}% this month! Getting better every game 💪 #LeagueOfLegends #Progress`,
    };

    return templates[type] || 'Check out my League of Legends stats!';
  }, []);

  return {
    friends,
    isLoading,
    sendFriendRequest,
    removeFriend,
    generateShareableContent,
  };
};