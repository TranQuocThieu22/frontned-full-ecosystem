import { IPagePermission } from "@/interfaces"
import { createGenericStore } from "@/shared/lib/createGenericStore"

export interface IStore_Permission {
    permission?: IPagePermission[]
    currentPermissionPage?: IPagePermission
    isSuperAdmin?: boolean
}

const useStore = createGenericStore<IStore_Permission>({
    initialState: {},
    storageKey: "useStore_Permission"
})

export function useStore_Permission() {
    const store = useStore()
    return {
        ...store
    }
}
