import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import App from './App.tsx';
import { queryClient, createPersistOptions } from './lib/queryClient';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element for LegendScope.');
}

const persistOptions = createPersistOptions();

createRoot(container).render(
  <StrictMode>
    {persistOptions ? (
      <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
        <App />
      </PersistQueryClientProvider>
    ) : (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )}
  </StrictMode>,
);
