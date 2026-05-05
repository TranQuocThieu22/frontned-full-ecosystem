import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

interface I {
    coeSubjectName?: string
    programName?: string
    gradeName?: string
    formulaType?: string
    currentFormulaPercent?: number
}

const useStore = createGenericStore<I>({
    initialState: {},
    storageKey: "useS_ConfigCLOAssessment"
})

export function useS_ConfigCLOAssessment() {
    const store = useStore()

    return {
        ...store
    }
}