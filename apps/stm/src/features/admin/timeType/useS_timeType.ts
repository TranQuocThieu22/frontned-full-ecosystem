import { TimeType } from "@/shared/interfaces/timeType";
import { createGenericStore } from "@/stores/CreateGenericStore";

const useStore = createGenericStore<{
    timeTypeId?: number,
    timeTypes?: TimeType[]
}>({
    initialState: { timeTypeId: 0 },
    storageKey: "useS_timeType"
})

export default function useS_timeType() {
    const store = useStore()
    return {
        ...store
    }
}