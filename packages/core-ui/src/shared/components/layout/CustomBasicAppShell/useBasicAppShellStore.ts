import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";


interface I {
    moduleCode?: string
    moduleName?: string
    officelName?: string

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
        officelName: "",
        title: "",
        opened: true,
        groupMenuOpenId: []
    },
    storageKey: "useStore_BasicAppShell" + process.env.NEXT_PUBLIC_AQMODULE,
    persistOptions: {
        storage: {
            getItem: (name: string) => {
                if (typeof window === "undefined") return null;
                try {
                    return window.localStorage.getItem(name);
                } catch {
                    return null;
                }
            },
            setItem: (name: string, value: string) => {
                if (typeof window === "undefined") return;
                try {
                    window.localStorage.setItem(name, value);
                } catch (e: any) {
                    // QuotaExceededError thường do base64/logo nặng đã bị persist trước đó.
                    if (e?.name === "QuotaExceededError") {
                        try {
                            window.localStorage.removeItem(name);
                            window.localStorage.setItem(name, value);
                            return;
                        } catch {
                            // ignore
                        }
                    }
                }
            },
            removeItem: (name: string) => {
                if (typeof window === "undefined") return;
                try {
                    window.localStorage.removeItem(name);
                } catch {
                    // ignore
                }
            },
        },
        // Avoid persisting large base64 logo/favicon payloads in localStorage (causes QuotaExceededError).
        partialize: (state: I) => {
            const { logoFileDetail, faviconFileDetail, ...rest } = state;
            return rest;
        },
    },
});

export function useBasicAppShellStore() {
    const store = useStore();
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
    return {
        ...store,
        toggle,
        toggleGroupMenuOpenId,
        clearGroupMenuOpenId,
    };
}
