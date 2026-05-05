import { Question } from "@/shared/interfaces/Question"
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

interface I {
    questions?: Question[]
}

const useStore = createGenericStore<I>({
    initialState: { questions: [] },
})

export function useS_examPaper_CreateUpdate() {
    const store = useStore()
    return {
        ...store
    }
}