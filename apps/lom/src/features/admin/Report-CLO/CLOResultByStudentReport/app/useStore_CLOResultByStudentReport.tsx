import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

interface I {
    studentName?: string,
    studentId?: number
    subjectId?: number

    studentCode?: string
    subjectName?: string
    gradeName?: string

    department?: string
}
const useStore = createGenericStore<I>({
    initialState: {}
})

export function useStore_CLOResultByStudentReport() {
    const store = useStore()
    return {
        ...store
    }
}