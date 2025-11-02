import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { 
  Player, 
  PlayerInsights, 
  ProgressData, 
  YearEndSummary, 
  Friend,
  LoadingState,
  TimeFrame,
  GameMode,
  Region 
} from '../types';

interface PlayerState {
  currentPlayer: Player | null;
  insights: PlayerInsights | null;
  progressData: ProgressData | null;
  yearEndSummary: YearEndSummary | null;
  friends: Friend[];
  selectedTimeframe: TimeFrame;
  selectedGameMode: GameMode;
  selectedRegion: Region;
  loadingState: LoadingState;
  
  // Actions
  setCurrentPlayer: (player: Player) => void;
  setInsights: (insights: PlayerInsights) => void;
  setProgressData: (data: ProgressData) => void;
  setYearEndSummary: (summary: YearEndSummary) => void;
  setFriends: (friends: Friend[]) => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;
  setTimeframe: (timeframe: TimeFrame) => void;
  setGameMode: (gameMode: GameMode) => void;
  setRegion: (region: Region) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  logout: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        currentPlayer: null,
        insights: null,
        progressData: null,
        yearEndSummary: null,
        friends: [],
        selectedTimeframe: 'month',
        selectedGameMode: 'ranked_solo',
        selectedRegion: 'na1',
        loadingState: {
          isLoading: false,
          error: null,
          lastUpdated: null,
        },

        // Actions
        setCurrentPlayer: (player) =>
          set((state) => ({
            currentPlayer: player,
            loadingState: {
              ...state.loadingState,
              lastUpdated: Date.now(),
            },
          })),

        setInsights: (insights) =>
          set((state) => ({
            insights,
            loadingState: {
              ...state.loadingState,
              lastUpdated: Date.now(),
            },
          })),

        setProgressData: (data) =>
          set((state) => ({
            progressData: data,
            loadingState: {
              ...state.loadingState,
              lastUpdated: Date.now(),
            },
          })),

        setYearEndSummary: (summary) =>
          set((state) => ({
            yearEndSummary: summary,
            loadingState: {
              ...state.loadingState,
              lastUpdated: Date.now(),
            },
          })),

        setFriends: (friends) => set({ friends }),

        addFriend: (friend) =>
          set((state) => ({
            friends: [...state.friends, friend],
          })),

        removeFriend: (friendId) =>
          set((state) => ({
            friends: state.friends.filter((f) => f.id !== friendId),
          })),

        setTimeframe: (timeframe) => set({ selectedTimeframe: timeframe }),

        setGameMode: (gameMode) => set({ selectedGameMode: gameMode }),

        setRegion: (region) => set({ selectedRegion: region }),

        setLoading: (isLoading) =>
          set((state) => ({
            loadingState: {
              ...state.loadingState,
              isLoading,
            },
          })),

        setError: (error) =>
          set((state) => ({
            loadingState: {
              ...state.loadingState,
              error,
              isLoading: false,
            },
          })),

        clearError: () =>
          set((state) => ({
            loadingState: {
              ...state.loadingState,
              error: null,
            },
          })),

        logout: () =>
          set({
            currentPlayer: null,
            insights: null,
            progressData: null,
            yearEndSummary: null,
            friends: [],
            loadingState: {
              isLoading: false,
              error: null,
              lastUpdated: null,
            },
          }),
      }),
      {
        name: 'legendscope-player-store',
        partialize: (state) => ({
          currentPlayer: state.currentPlayer,
          friends: state.friends,
          selectedTimeframe: state.selectedTimeframe,
          selectedGameMode: state.selectedGameMode,
          selectedRegion: state.selectedRegion,
        }),
      }
    ),
    {
      name: 'PlayerStore',
    }
  )
);

// UI Store for application state
interface UIState {
  sidebarOpen: boolean;
  activeTab: string;
  notifications: Notification[];
  theme: 'light' | 'dark';
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  toggleTheme: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  duration?: number;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        sidebarOpen: true,
        activeTab: 'dashboard',
        notifications: [],
        theme: 'dark',

        // Actions
        toggleSidebar: () =>
          set((state) => ({
            sidebarOpen: !state.sidebarOpen,
          })),

        setSidebarOpen: (open) => set({ sidebarOpen: open }),

        setActiveTab: (tab) => set({ activeTab: tab }),

        addNotification: (notification) => {
          const id = Math.random().toString(36).substr(2, 9);
          const newNotification: Notification = {
            ...notification,
            id,
            timestamp: Date.now(),
            duration: notification.duration || 5000,
          };

          set((state) => ({
            notifications: [...state.notifications, newNotification],
          }));

          // Auto remove notification after duration
          if (newNotification.duration) {
            setTimeout(() => {
              get().removeNotification(id);
            }, newNotification.duration);
          }
        },

        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),

        clearNotifications: () => set({ notifications: [] }),

        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
          })),
      }),
      {
        name: 'legendscope-ui-store',
        partialize: (state) => ({
          sidebarOpen: state.sidebarOpen,
          activeTab: state.activeTab,
          theme: state.theme,
        }),
      }
    ),
    {
      name: 'UIStore',
    }
  )
);