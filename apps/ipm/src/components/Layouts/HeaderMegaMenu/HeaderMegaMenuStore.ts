import { createGenericStore } from "aq-fe-framework/build-object";

interface I {
    name?: string;
}

const useHeaderMegaMenuStore: any = createGenericStore<I>({
    initialState: { name: "Đăng ký khóa học" },
    storageKey: 'HeaderMegaMenuStore'
});

export default useHeaderMegaMenuStore