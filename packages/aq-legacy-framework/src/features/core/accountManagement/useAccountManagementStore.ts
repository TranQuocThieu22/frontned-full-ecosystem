import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

interface I {
    isRequireSkillCenter?: boolean
}

const useStore = createGenericStore<I>({
    initialState: {}
})

export default function useAccountManagementStore() {
    const store = useStore()
    return {
        ...store
    }
}