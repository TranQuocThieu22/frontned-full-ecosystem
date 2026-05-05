import { AqModuleId } from "@aq-fe/core-ui/shared/consts/enum/aqModuleIdEnum"
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

interface ProjectInfoStoreProps {
    aqModuleId?: AqModuleId
}

const useStore = createGenericStore<ProjectInfoStoreProps>({
    initialState: {},
    storageKey: "useStore_ProjectInfo" + process.env.NEXT_PUBLIC_AQMODULE
})

export function useProjectInfoStore() {
    const store = useStore()
    return {
        ...store
    }
}
