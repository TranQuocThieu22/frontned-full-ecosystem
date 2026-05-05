import { createGenericStore } from "aq-fe-framework/shared"
interface I {
    certificateIdx?: number
    certificateName?: string
    fullName?: string
    decisionDate?: string
}

const useStore = createGenericStore<I>({
    initialState: {},
    storageKey: "useS_ixnczwdmas"
})

export function useS_ixnczwdmas() {
    const store = useStore()
    return {
        ...store
    }
}