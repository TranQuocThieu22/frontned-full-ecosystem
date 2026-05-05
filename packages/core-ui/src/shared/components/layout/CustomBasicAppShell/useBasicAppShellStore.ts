import { useGetAQModuleQuery } from "@aq-fe/core-ui/shared/hooks/useGetAQModuleQuery";
import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";


interface I {
    moduleCode?: string
    moduleName?: string

    logoFileDetail?: AQFileDetail,
    faviconFileDetail?: AQFileDetail
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
    storageKey: "useStore_BasicAppShell" + process.env.NEXT_PUBLIC_AQMODULE,
});

export function useBasicAppShellStore() {
    const store = useStore();
    const GetAQModule_query = useGetAQModuleQuery()
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
