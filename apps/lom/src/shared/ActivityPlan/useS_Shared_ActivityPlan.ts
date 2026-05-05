import { ActivityPlan } from '@/interfaces/shared-interfaces/ActivityPlan';
import { createGenericStore } from '@aq-fe/core-ui/shared/libs/createGenericStore';
// import { createGenericStore } from '@aq-fe/core-ui/shared/libs/createGenericStore';

interface I {
  ActivityPlan?: ActivityPlan;
}

const useStore = createGenericStore<I>({
  initialState: { ActivityPlan: undefined },
  storageKey: 'useS_Shared_ActivityPlan',
});

export default function useS_Shared_ActivityPlan() {
  const store = useStore();
  return store;
}
