import type { BackendStatus } from './BackendStatus';

export interface SummarySection<T> {
  status: BackendStatus;
  data: T | null;
  message?: string;
}

const TERMINAL_STATUSES: BackendStatus[] = ['READY', 'FAILED', 'NO_MATCHES'];

export const isTerminalStatus = (status: BackendStatus): boolean => {
  return TERMINAL_STATUSES.includes(status);
};

export const isInProgressStatus = (status: BackendStatus): boolean => {
  return !isTerminalStatus(status);
};
