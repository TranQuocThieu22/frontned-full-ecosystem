import { ActivityPlan } from '@/interfaces/activityPlan';
import { createGenericStore } from '@aq-fe/core-ui/shared/libs/createGenericStore';

interface I {
  ActivityPlan?: ActivityPlan;
}

const useStore = createGenericStore<I>({
  initialState: { ActivityPlan: undefined },
  storageKey: 'useS_Shared_ActivityPlan',
});

export default function useS_Shared_ActivityPlan(): any {
  const store = useStore();
  return store;
}
