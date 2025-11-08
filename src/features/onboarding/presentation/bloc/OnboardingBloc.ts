import { useCallback, useState } from 'react';
import type { PlayerProfile } from '../../domain/entities/PlayerProfile';
import { LookupPlayerProfileUseCase, type LookupPlayerProfileParams } from '../../domain/usecases/LookupPlayerProfileUseCase';

export interface OnboardingState {
  profile: PlayerProfile | null;
  loading: boolean;
  error: string | null;
}

export class OnboardingBloc {
  private readonly lookupPlayerProfile: LookupPlayerProfileUseCase;

  constructor(lookupPlayerProfile: LookupPlayerProfileUseCase) {
    this.lookupPlayerProfile = lookupPlayerProfile;
  }

  async lookup(params: LookupPlayerProfileParams): Promise<PlayerProfile> {
    return this.lookupPlayerProfile.execute(params);
  }
}

export function useOnboardingBloc(bloc: OnboardingBloc) {
  const [state, setState] = useState<OnboardingState>({
    profile: null,
    loading: false,
    error: null,
  });

  const lookup = useCallback(
    async (params: LookupPlayerProfileParams): Promise<PlayerProfile> => {
      setState((previous) => ({ ...previous, loading: true, error: null }));

      try {
        const profile = await bloc.lookup(params);
        setState({ profile, loading: false, error: null });
        return profile;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch profile.';
        setState({ profile: null, loading: false, error: message });
        throw new Error(message);
      }
    },
    [bloc]
  );

  return {
    state,
    lookup,
  } as const;
}
