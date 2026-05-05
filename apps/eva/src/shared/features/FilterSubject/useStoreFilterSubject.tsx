import { Subject } from "@/shared/interfaces/Subject";
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

interface I {
    subject?: Subject
}

const useStore = createGenericStore<I>({
    initialState: { subject: {} }
})


export function useStoreFilterSubject() {
    const store = useStore()
    return {
        ...store
    }
}