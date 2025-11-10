import {
  legendScopeBackend,
  type ApiEnvelope,
} from '../../../../../services/legendScopeBackend';
import type { BackendStatus } from '../../../../../types/BackendStatus';
import type { SummarySection } from '../../../../../types/SummarySection';
import type { FaultlinesSummaryModel } from '../../models/FaultlinesSummaryModel';

export class FaultlinesRemoteDataSource {
  async fetchSummary(playerId: string): Promise<SummarySection<FaultlinesSummaryModel>> {
    try {
      const envelope = await legendScopeBackend.getFaultlinesSummary(playerId);
      return this.normalizeSection(envelope);
    } catch (error) {
      return this.createFailedSection(error);
    }
  }

  private normalizeSection(
    envelope: ApiEnvelope<FaultlinesSummaryModel>,
  ): SummarySection<FaultlinesSummaryModel> {
    const { status, originalStatus } = this.normalizeBackendStatus(envelope.status);

    if (status === 'READY' && envelope.data) {
      return {
        status: 'READY',
        data: envelope.data,
      };
    }

    return {
      status,
      data: null,
      message: this.buildStatusMessage(status, originalStatus),
    };
  }

  private createFailedSection(error: unknown): SummarySection<FaultlinesSummaryModel> {
    const message = error instanceof Error ? error.message : String(error ?? 'Unexpected error');

    return {
      status: 'FAILED',
      data: null,
      message: message || 'Failed to load faultlines summary.',
    };
  }

  private normalizeBackendStatus(rawStatus?: BackendStatus): {
    status: BackendStatus;
    originalStatus?: BackendStatus;
  } {
    if (!rawStatus) {
      return { status: 'FETCHING', originalStatus: rawStatus };
    }

    const normalized = typeof rawStatus === 'string' ? rawStatus.toUpperCase() : rawStatus;

    const readyStatuses = new Set([
      'READY',
      'SUCCESS',
      'SUCCEEDED',
      'COMPLETED',
      'COMPLETE',
      'DONE',
      'FINISHED',
      'OK',
    ]);

    if (typeof normalized === 'string' && readyStatuses.has(normalized)) {
      return { status: 'READY', originalStatus: rawStatus };
    }

    if (!normalized || normalized === 'UNKNOWN') {
      return { status: 'FETCHING', originalStatus: rawStatus };
    }

    const inProgressStatuses = new Set(['PENDING', 'PROCESSING', 'IN_PROGRESS', 'STARTED', 'WAITING']);
    if (typeof normalized === 'string' && inProgressStatuses.has(normalized)) {
      return { status: 'FETCHING', originalStatus: rawStatus };
    }

    if (normalized === 'ERROR') {
      return { status: 'FAILED', originalStatus: rawStatus };
    }

    return { status: normalized as BackendStatus, originalStatus: rawStatus };
  }

  private buildStatusMessage(status: BackendStatus, originalStatus?: BackendStatus): string | undefined {
    const normalizedOriginal =
      typeof originalStatus === 'string' ? originalStatus.toUpperCase() : originalStatus;

    switch (status) {
      case 'FAILED':
        return 'LegendScope backend was unable to compute the faultlines analysis.';
      case 'NO_MATCHES':
        return 'LegendScope backend could not find enough matches to build the faultlines diagnostic.';
      case 'NOT_STARTED':
        return 'Faultlines analysis has not been queued yet for this player.';
      case 'FETCHING':
        if (!normalizedOriginal || normalizedOriginal === 'UNKNOWN') {
          return 'Awaiting the first Faultlines response from LegendScope. The backend is still assembling the diagnostic.';
        }

        if (
          normalizedOriginal === 'PENDING' ||
          normalizedOriginal === 'PROCESSING' ||
          normalizedOriginal === 'IN_PROGRESS' ||
          normalizedOriginal === 'STARTED' ||
          normalizedOriginal === 'WAITING'
        ) {
          return 'LegendScope is still processing the Faultlines summary.';
        }

        return undefined;
      default:
        return undefined;
    }
  }
}
