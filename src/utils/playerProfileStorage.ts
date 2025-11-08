import type { PlayerData } from '../types/PlayerData';
import { PLAYER_PROFILE_STORAGE_KEY } from '../constants/storageKeys';

const safeWindow = () => (typeof window === 'undefined' ? undefined : window);

export const getStoredPlayerProfile = (): PlayerData | null => {
  const w = safeWindow();
  if (!w) {
    return null;
  }

  try {
    const raw = w.localStorage.getItem(PLAYER_PROFILE_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as PlayerData;
  } catch (error) {
    console.error('Failed to read stored player profile', error);
    return null;
  }
};

export const setStoredPlayerProfile = (profile: PlayerData): void => {
  const w = safeWindow();
  if (!w) {
    return;
  }

  try {
    w.localStorage.setItem(PLAYER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to store player profile', error);
  }
};

export const clearStoredPlayerProfile = (): void => {
  const w = safeWindow();
  if (!w) {
    return;
  }

  try {
    w.localStorage.removeItem(PLAYER_PROFILE_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear stored player profile', error);
  }
};
