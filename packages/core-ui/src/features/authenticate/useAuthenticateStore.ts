import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore"

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

  storageKey: "useAuthenticateStore" + process.env.NEXT_PUBLIC_AQMODULE
})
export function useAuthenticateStore() {
  const store = useStore()

  return {
    ...store
  }
}
