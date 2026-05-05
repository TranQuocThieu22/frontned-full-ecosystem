import { createGenericStore } from "@/shared/lib/createGenericStore"

interface I {
    isRequireSkillCenter?: boolean
}

const useStore = createGenericStore<I>({
    initialState: {}
})

export default function useStore_AccountManagement() {
    const store = useStore()
    return {
        ...store
    }
}