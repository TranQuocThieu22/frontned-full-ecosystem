import { COECLOPI } from "@/interfaces/shared-interfaces/COECLOPi"
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

// Update your store interface to handle deletions separately
interface I {
    edited?: Record<string, COECLOPI>
    deleted?: Record<string, boolean> // Track deleted relation IDs
}

const useStore = createGenericStore<I>({
    initialState: {},
    storageKey: "useS_CLOPIRelationMatrix"
})

export default function useS_CLOPIRelationMatrix() {
    const store = useStore()
    return {
        ...store,
    }
}