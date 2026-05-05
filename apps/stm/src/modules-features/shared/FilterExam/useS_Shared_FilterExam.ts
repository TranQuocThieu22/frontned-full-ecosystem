import { createGenericStore } from "@/stores/CreateGenericStore";

interface I {
    examId?: number
    programId?: number
}
const useStore = createGenericStore<I>({
    initialState: { examId: 0, programId: 0 },
})
export default function useS_Shared_FilterExam() {
    const store = useStore()
    return {
        ...store
    }
}