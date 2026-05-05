import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IPhase } from '@/shared/interfaces/Phase/IPhase';
import { IStandardSet } from '@/shared/interfaces/standardSet/StandardSet';
import { ITrainingProgram } from '@/shared/interfaces/trainingProgram/ITrainingProgram';

interface FilterState {
  StandardSet?: IStandardSet;
  TrainingProgram?: ITrainingProgram;
  Phase?: IPhase;
  standardSets: IStandardSet[];
}

interface FilterStore {
  state: FilterState;
  setStandardSets: (data: IStandardSet[]) => void;
  setStandardSet: (id: number | null) => void;
  setTrainingProgram: (id: number | null) => void;
  setPhase: (id: number | null) => void;
  initializeDefaults: () => void;
  refreshSelections: () => void; // NEW: Force refresh with current data
}

const useS_Shared_Filter_Store = create<FilterStore>()(
  persist(
    (set, get) => ({
      state: {
        StandardSet: undefined,
        TrainingProgram: undefined,
        Phase: undefined,
        standardSets: [],
      },

      setStandardSets: (data) => {
        set((store) => {
          const currentState = store.state;
          const newState = {
            ...currentState,
            standardSets: data,
          };

          // If we have persisted IDs but the objects are stale, refresh them
          if (currentState.StandardSet?.id) {
            const freshStandardSet = data.find(s => s.id === currentState.StandardSet?.id);
            if (freshStandardSet) {
              newState.StandardSet = freshStandardSet;

              if (currentState.TrainingProgram?.id) {
                const freshTP = freshStandardSet.trainingPrograms?.find(
                  tp => tp.id === currentState.TrainingProgram?.id
                );
                if (freshTP) {
                  newState.TrainingProgram = freshTP;

                  if (currentState.Phase?.id) {
                    const freshPhase = freshTP.phases?.find(
                      p => p.id === currentState.Phase?.id
                    );
                    if (freshPhase) {
                      newState.Phase = freshPhase;
                    } else {
                      // Phase doesn't exist anymore, clear it
                      newState.Phase = undefined;
                    }
                  }
                } else {
                  // Training program doesn't exist anymore
                  newState.TrainingProgram = undefined;
                  newState.Phase = undefined;
                }
              }
            } else {
              // Standard set doesn't exist anymore
              newState.StandardSet = undefined;
              newState.TrainingProgram = undefined;
              newState.Phase = undefined;
            }
          }

          return { state: newState };
        });
      },

      setStandardSet: (id) => {
        const standardSets = get().state.standardSets;
        const standardSet = id ? standardSets.find(s => s.id === id) : undefined;

        set((store) => ({
          state: {
            ...store.state,
            StandardSet: standardSet,
            TrainingProgram: undefined,
            Phase: undefined,
          }
        }));
      },

      setTrainingProgram: (id) => {
        const standardSet = get().state.StandardSet;
        const trainingProgram = id && standardSet
          ? standardSet.trainingPrograms?.find(tp => tp.id === id)
          : undefined;

        set((store) => ({
          state: {
            ...store.state,
            TrainingProgram: trainingProgram,
            Phase: undefined,
          }
        }));
      },

      setPhase: (id) => {
        const trainingProgram = get().state.TrainingProgram;
        const phase = id && trainingProgram
          ? trainingProgram.phases?.find(p => p.id === id)
          : undefined;

        set((store) => ({
          state: {
            ...store.state,
            Phase: phase,
          }
        }));
      },

      refreshSelections: () => {
        const currentState = get().state;
        const standardSets = currentState.standardSets;

        if (!standardSets || standardSets.length === 0) return;

        // Try to refresh current selections with latest data
        if (currentState.StandardSet?.id) {
          const freshStandardSet = standardSets.find(s => s.id === currentState.StandardSet?.id);

          if (freshStandardSet) {
            set({
              state: {
                ...currentState,
                StandardSet: freshStandardSet,
                TrainingProgram: currentState.TrainingProgram?.id
                  ? freshStandardSet.trainingPrograms?.find(tp => tp.id === currentState.TrainingProgram?.id)
                  : undefined,
                Phase: currentState.Phase?.id && currentState.TrainingProgram?.id
                  ? freshStandardSet.trainingPrograms
                    ?.find(tp => tp.id === currentState.TrainingProgram?.id)
                    ?.phases?.find(p => p.id === currentState.Phase?.id)
                  : undefined,
              }
            });
          }
        }
      },

      initializeDefaults: () => {
        const currentState = get().state;
        const standardSets = currentState.standardSets;

        if (!standardSets || standardSets.length === 0) {
          return;
        }

        // If we have persisted selections with IDs but missing nested data, restore them
        if (currentState.StandardSet?.id && !currentState.StandardSet.trainingPrograms) {
          const fullStandardSet = standardSets.find(s => s.id === currentState.StandardSet?.id);
          if (fullStandardSet) {
            const fullTrainingProgram = currentState.TrainingProgram?.id
              ? fullStandardSet.trainingPrograms?.find(tp => tp.id === currentState.TrainingProgram?.id)
              : undefined;
            const fullPhase = currentState.Phase?.id && fullTrainingProgram
              ? fullTrainingProgram.phases?.find(p => p.id === currentState.Phase?.id)
              : undefined;

            set({
              state: {
                ...currentState,
                StandardSet: fullStandardSet,
                TrainingProgram: fullTrainingProgram,
                Phase: fullPhase,
              }
            });
            return;
          }
        }

        // Skip if already initialized with full data
        if (currentState.StandardSet?.trainingPrograms) {
          return;
        }

        // Try to find a phase with isCurrent = true
        for (const standardSet of standardSets) {
          for (const trainingProgram of standardSet.trainingPrograms || []) {
            const currentPhase = trainingProgram.phases?.find(p => p.isCurrent);
            if (currentPhase) {
              set({
                state: {
                  ...currentState,
                  StandardSet: standardSet,
                  TrainingProgram: trainingProgram,
                  Phase: currentPhase,
                }
              });
              return;
            }
          }
        }

        // If no current phase found, use first available
        const firstSet = standardSets[0];
        const firstTP = firstSet?.trainingPrograms?.[0];
        const firstPhase = firstTP?.phases?.[0];

        set({
          state: {
            ...currentState,
            StandardSet: firstSet,
            TrainingProgram: firstTP,
            Phase: firstPhase,
          }
        });
      }
    }),
    {
      name: 'useS_Shared_Filter',
      version: 2, // ✅ Increment version
      partialize: (store) => ({
        state: {
          // Only persist IDs, not full objects
          StandardSet: store.state.StandardSet ? { id: store.state.StandardSet.id } : undefined,
          TrainingProgram: store.state.TrainingProgram ? { id: store.state.TrainingProgram.id } : undefined,
          Phase: store.state.Phase ? { id: store.state.Phase.id } : undefined,
          standardSets: [], // Don't persist full data
        },
      }),
    }
  )
);

export default function useS_Shared_Filter() {
  return useS_Shared_Filter_Store();
}
