import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";


interface I {
    subjectId: number
}


const useStore = createGenericStore<I>({
    initialState: { subjectId: 0 },
});
export default function useS_Topic() {
    const store = useStore();
    return {
        ...store
    }
}