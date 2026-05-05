import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"
interface I {
    programId?: string | null,
    gradeId?: string | null,
    classId?: string | null,
    subjectId?: string | null

    programName?: string
    gradeName?: string
    className?: string
    subjectName?: string
}

const useStore = createGenericStore<I>({
    initialState: {}
})

export function useStore_CLOResultByClassReport() {
    const store = useStore()
    return {
        ...store
    }
}