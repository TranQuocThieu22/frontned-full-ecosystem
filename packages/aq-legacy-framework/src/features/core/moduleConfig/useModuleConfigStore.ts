import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

interface I {
    AQModuleId?: number
}

const useStore = createGenericStore<I>({
    initialState: {}
})

export function useModuleConfigStore() {
    const store = useStore()
    return {
        ...store,
    }
}