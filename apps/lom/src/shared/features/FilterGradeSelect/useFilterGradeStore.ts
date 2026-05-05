import { COEGrade } from "@/interfaces/shared-interfaces/COEGrade"
import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram"
import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
    program?: COEProgram
    grade?: COEGrade
    noData?: boolean
}

const useStore = createGenericStore<I>({
    initialState: { grade: { id: 0 }, program: { id: 0 } },
})

export default function useFilterGradeStore() {
    const store = useStore()
    return {
        ...store,
    }
}
