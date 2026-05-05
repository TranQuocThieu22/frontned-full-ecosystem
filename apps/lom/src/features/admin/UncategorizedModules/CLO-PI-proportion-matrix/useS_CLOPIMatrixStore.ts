import { COECLOPI } from "@/interfaces/shared-interfaces/COECLOPi"
import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
    edited?: Record<string, COECLOPI>
}

const useStore = createGenericStore<I>({
    initialState: {},
    storageKey: "useS_hxrvhadcfm"
})

export default function useS_CLOPIMatrixStore() {
    const store = useStore()
    return {
        ...store,
    }
}
