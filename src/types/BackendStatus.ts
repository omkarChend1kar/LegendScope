export type BackendStatus =
  | 'NOT_STARTED'
  | 'FETCHING'
  | 'READY'
  | 'NO_MATCHES'
  | 'FAILED'
  | 'UNKNOWN'
  | string;
