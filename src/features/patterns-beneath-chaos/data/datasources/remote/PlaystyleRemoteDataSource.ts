import {
  legendScopeBackend,
  type ApiEnvelope,
} from '../../../../../services/legendScopeBackend';
import type { BackendStatus } from '../../../../../types/BackendStatus';
import type { SummarySection } from '../../../../../types/SummarySection';
import type { PlaystyleSummaryModel } from '../../models/PatternsSummaryModel';

export class PlaystyleRemoteDataSource {
  async fetchSummary(playerId: string): Promise<SummarySection<PlaystyleSummaryModel>> {
    try {
      const envelope = await legendScopeBackend.getSignaturePlaystyleSummary(playerId);
      return this.normalizeSection(envelope);
    } catch (error) {
      return this.createFailedSection(error);
    }
  }

  private normalizeSection(
    envelope: ApiEnvelope<PlaystyleSummaryModel>,
  ): SummarySection<PlaystyleSummaryModel> {
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

  private createFailedSection(error: unknown): SummarySection<PlaystyleSummaryModel> {
    const message = error instanceof Error ? error.message : String(error ?? 'Unexpected error');

    return {
      status: 'FAILED',
      data: null,
      message: message || 'Failed to load signature playstyle summary.',
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

    const inProgressStatuses = new Set(['PENDING', 'PROCESSING', 'IN_PROGRESS', 'STARTED']);
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
        return 'LegendScope backend was unable to compute the signature playstyle analysis.';
      case 'NO_MATCHES':
        return 'LegendScope backend could not find enough matches to build the playstyle analysis.';
      case 'NOT_STARTED':
        return 'Signature playstyle analysis has not been queued yet for this player.';
      case 'FETCHING':
        if (!normalizedOriginal || normalizedOriginal === 'UNKNOWN') {
          return 'Awaiting the first signature playstyle response from LegendScope. The backend is still assembling the analysis.';
        }

        if (
          normalizedOriginal === 'PENDING' ||
          normalizedOriginal === 'PROCESSING' ||
          normalizedOriginal === 'IN_PROGRESS' ||
          normalizedOriginal === 'STARTED'
        ) {
          return 'LegendScope is still processing the signature playstyle summary.';
        }

        return undefined;
      default:
        return undefined;
    }
  }
}
