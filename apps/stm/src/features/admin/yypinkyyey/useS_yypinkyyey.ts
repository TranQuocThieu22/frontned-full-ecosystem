import { createGenericStore } from "@/stores/CreateGenericStore";

interface I {

}

const useStore = createGenericStore<I>({
    initialState: {}
})

function useS_yypinkyyey() {
    const store = useStore()

    return {
        ...store
    }
}