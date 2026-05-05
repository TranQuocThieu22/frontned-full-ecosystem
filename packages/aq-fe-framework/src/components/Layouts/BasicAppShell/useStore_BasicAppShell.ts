import { useQ_AQ_GetAQModule } from "@/hooks/query/AQ/useQ_AQ_GetAQModule";
import { createGenericStore } from "@/shared/lib/createGenericStore";
import { IAQFileDetail } from "@/utils";

interface I {
    moduleCode?: string
    moduleName?: string

    logoFileDetail?: IAQFileDetail,
    faviconFileDetail?: IAQFileDetail
    fileGuildePath?: string

    currentPageId?: number
    opened: boolean
    title: string
    note?: string
    groupMenuOpenId: string[]
    menuCode?: string;
    status?: string
    breadcrumb?: string[]

    description?: string
    videoLink?: string
}

const useStore = createGenericStore<I>({
    initialState: {
        menuCode: "",
        moduleCode: "Module code",
        moduleName: "Module name",
        title: "",
        opened: true,
        groupMenuOpenId: []
    },
    storageKey: "useStore_BasicAppShell",
});

export function useStore_BasicAppShell() {
    const store = useStore();
    const GetAQModule_query = useQ_AQ_GetAQModule()
    function toggle() {
        store.setProperty("opened", !store.state.opened);
    }
    function toggleGroupMenuOpenId(id: string) {
        const currentIds = store.state.groupMenuOpenId;
        if (currentIds.includes(id)) {
            // Nếu id đã tồn tại, xóa nó
            store.setProperty(
                "groupMenuOpenId",
                currentIds.filter((existingId) => existingId !== id)
            );
        } else {
            store.setProperty("groupMenuOpenId", [...currentIds, id]);
        }
    }
    function clearGroupMenuOpenId() {
        store.setProperty("groupMenuOpenId", []);
    }
    function setDefault() {
        if (!GetAQModule_query.data) return
        store.setProperty("faviconFileDetail", GetAQModule_query.data?.faviconFileDetail)
        store.setProperty("logoFileDetail", GetAQModule_query.data?.logoFileDetail)
    }

    return {
        ...store,
        toggle,
        toggleGroupMenuOpenId,
        clearGroupMenuOpenId,
        setDefault
    };
}
