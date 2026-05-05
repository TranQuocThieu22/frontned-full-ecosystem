import { createGenericStore } from "@/shared/lib/createGenericStore"

interface I {
    AQModuleId?: number
}

const useStore = createGenericStore<I>({
    initialState: {}
})

export function useS_moduleConfig() {
    const store = useStore()
    return {
        ...store,
    }
}