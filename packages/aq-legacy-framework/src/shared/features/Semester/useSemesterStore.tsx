import { ActivityPlan } from "@aq-fe/aq-legacy-framework/shared/interfaces/ActivityPlan";
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

interface SemesterStoreProps {
    semester?: ActivityPlan
}


const useStore = createGenericStore<SemesterStoreProps>({
    initialState: {},
    storageKey: ""
})

export function useSemesterStore() {
    const store = useStore()
    return {
        ...store
    }
}