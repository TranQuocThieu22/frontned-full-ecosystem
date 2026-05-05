import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

interface ProgressReportStoreProps {
    historyReportId?: number
}


const useStore = createGenericStore<ProgressReportStoreProps>({
    initialState: { historyReportId: 0 },
})

export function useProgressReportStore() {
    const store = useStore()
    return {
        ...store
    }
}