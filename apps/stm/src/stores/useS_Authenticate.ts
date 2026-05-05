import { createGenericStore } from "./CreateGenericStore";

interface I {
  token?: string;
}

const useStore = createGenericStore<I>({
  initialState: { token: "" },
  storageKey: "useAuthenticateStore "
})
export default function useAuthenticateStore() {
  const store = useStore()
  return {
    ...store
  }
}
