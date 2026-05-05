import { Class } from "@/interfaces/shared-interfaces/Class";
import { COEGrade } from "@/interfaces/shared-interfaces/COEGrade";
import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram";
import { createGenericStore } from "@/stores/S0GenericStore";

interface I {
    program?: COEProgram
    grade?: COEGrade
    class?: Class
    noData?: boolean
}

const useStore = createGenericStore<I>({
    initialState: { grade: { id: 0 }, program: { id: 0 }, class: { id: 0 } },
    storageKey: "useS_FilterClass"
})

export default function useS_FilterClass() {
    const store = useStore()
    return {
        ...store,
    }
}
