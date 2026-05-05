import { createGenericStore } from "@/shared/lib/createGenericStore"

export interface IStore_Authenticate {
  token?: string
  userId?: number
  fullName?: string
  code?: string,
  username?: string,
  password?: string,
  saveLogin?: boolean
  workingUnitId?: number
  roleIds?: number[]
}

const useStore = createGenericStore<IStore_Authenticate>({
  initialState: { token: "", saveLogin: false, username: "", password: "", workingUnitId: 0, roleIds: [] },

  storageKey: "useStore_Authenticate"
})
export function useStore_Authenticate() {
  const store = useStore()

  return {
    ...store
  }
}
