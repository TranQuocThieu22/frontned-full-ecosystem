import { createGenericStore } from "@/stores/CreateGenericStore"

interface I {
    userId?: number
}

const useStore = createGenericStore<I>({
    initialState: { userId: 0 },
})

export function useS_Shared_FilterStudent() {
    const store = useStore()
    return {
        ...store
    }
}