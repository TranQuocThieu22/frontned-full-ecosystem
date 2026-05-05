import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";


interface I {
    isComplete: boolean;
    status?: "single" | "multiple" | "complete"
}


const useStore = createGenericStore<I>({
    initialState: { isComplete: false, status: "multiple" },
});
export default function useS_TestRoom() {
    const store = useStore();
    return {
        ...store
    }
}