import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

interface I { }

const useStore = createGenericStore<I>({
    initialState: {}
})

export function useS_CLOComponentScores() {
    const store = useStore()
    return {
        ...store
    }
}