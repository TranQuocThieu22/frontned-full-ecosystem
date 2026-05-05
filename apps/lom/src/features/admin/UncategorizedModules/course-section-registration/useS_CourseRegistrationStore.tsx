import { COESubject } from "@/interfaces/shared-interfaces/COESubject"
import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
    subject?: COESubject
    courseSectionId?: number
}

const useStore = createGenericStore<I>({ initialState: {}, storageKey: "nugmpmukta" })
export default function useS_CourseRegistrationStore() {
    const store = useStore()
    return {
        ...store
    }
}
