import { createGenericStore } from "@/stores/CreateGenericStore";

interface I {
    examId?: number
}
const useStore = createGenericStore<I>({
    initialState: { examId: 0 },
    storageKey: "useS_w9e9qi813x"
})

export default function useS_w9e9qi813x() {
    const store = useStore()
    return {
        ...store
    }
}
