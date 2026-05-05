import { AqModuleId } from "@/shared/consts/aqModuleIdEnum"
import { createGenericStore } from "@/shared/lib/createGenericStore"

interface I {
    aqModuleId?: AqModuleId
}

const useStore = createGenericStore<I>({
    initialState: {},
    storageKey: "useStore_ProjectInfo"
})

export function useStore_ProjectInfo() {
    const store = useStore()
    return {
        ...store
    }
}
