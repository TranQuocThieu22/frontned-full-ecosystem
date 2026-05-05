import { createGenericStore } from "@/shared/lib/createGenericStore";

interface I {
    name?: string;
}

const useStore = createGenericStore<I>({
    initialState: { name: "Đăng ký khóa học" },
    storageKey: 'HeaderMegaMenuStore'
});



export function useHeaderMegaMenuStore() {
    const store = useStore()
    return {
        ...store
    }
}