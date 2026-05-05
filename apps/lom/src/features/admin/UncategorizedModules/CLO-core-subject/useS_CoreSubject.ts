import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
    gradeId?: number
    gradeCode?: string
    noData?: boolean
}

const useStore = createGenericStore<I>({
    initialState: { gradeId: 0, gradeCode: "" },
})

export default function useS_CoreSubject() {
    const store = useStore()
    return {
        ...store,
    }
}
