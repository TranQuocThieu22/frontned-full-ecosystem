import { genderEnum } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

interface I {
    studentId?: number,
    studentName?: string,
    dateOfBirth?: string,
    gender?: genderEnum
    program?: string,
    grade?: string,
    class?: string
}
const useStore = createGenericStore<I>({
    initialState: {}
})

export function useStore_CLOScoreReportByGrade() {
    const store = useStore()
    return {
        ...store
    }
}