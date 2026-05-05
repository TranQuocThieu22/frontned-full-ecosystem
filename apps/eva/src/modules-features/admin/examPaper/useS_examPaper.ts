import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

interface I {
    subjectId?: string | null
    examSectionId?: string | null
    examId?: string | null
}

const useStore = createGenericStore<I>({
    initialState: { examSectionId: null, examId: null },
})

export function useS_examPaper() {
    const store = useStore()
    return {
        ...store
    }
}