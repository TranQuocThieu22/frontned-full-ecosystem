import { createGenericStore } from "aq-fe-framework/stores"
interface I {
    isLogin?: boolean
}

const useStore = createGenericStore<I>({
    initialState: {
        isLogin: false
    },
})

export function useStore_Global() {
    const store = useStore()
    return {
        ...store
    }
}