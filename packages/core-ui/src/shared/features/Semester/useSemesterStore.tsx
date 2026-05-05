import { ActivityPlan } from "../../interfaces/ActivityPlan";
import { createGenericStore } from "../../libs/createGenericStore";

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