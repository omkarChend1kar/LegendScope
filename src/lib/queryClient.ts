import { QueryClient } from '@tanstack/react-query';
import type { PersistQueryClientProviderProps } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { get, set, del } from 'idb-keyval';

const CACHE_BUSTER = import.meta.env.VITE_CACHE_VERSION ?? 'v1';
const CACHE_KEY = 'legendscope-query-cache';
const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: ONE_DAY_MS,
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
      refetchOnReconnect: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const canUseIndexedDb = (): boolean =>
  typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';

export const createPersistOptions = (): PersistQueryClientProviderProps['persistOptions'] | null => {
  if (!canUseIndexedDb()) {
    return null;
  }

  const persister = createAsyncStoragePersister({
    storage: {
      getItem: async (key) => (await get(key)) ?? null,
      setItem: async (key, value) => {
        await set(key, value);
      },
      removeItem: async (key) => {
        await del(key);
      },
    },
    key: CACHE_KEY,
    throttleTime: 2000,
  });

  return {
    persister,
    maxAge: ONE_DAY_MS,
    buster: CACHE_BUSTER,
    dehydrateOptions: {
      shouldDehydrateQuery: (query) => query.state.status === 'success',
    },
  };
};
