import type { BackendStatus } from '../../../../types/BackendStatus';

export interface SummarySection<T> {
  status: BackendStatus;
  data: T | null;
  message?: string;
}
