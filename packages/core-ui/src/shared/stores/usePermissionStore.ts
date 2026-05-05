import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"
import { PagePermission } from "../interfaces/PagePermission"

export interface PermissionStoreProps {
    permission?: PagePermission[]
    currentPermissionPage?: PagePermission
    isSuperAdmin?: boolean
}

const useStore = createGenericStore<PermissionStoreProps>({
    initialState: {},
    storageKey: "useStore_Permission" + process.env.NEXT_PUBLIC_AQMODULE
})

export function usePermissionStore() {
    const store = useStore()
    return {
        ...store
    }
}
