import { createGenericStore } from "./CreateGenericStore";

interface I {
  token?: string;
}

const useStore = createGenericStore<I>({
  initialState: { token: "" },
  storageKey: "useStore_Authenticate "
})
export default function useStore_Authenticate() {
  const store = useStore()
  return {
    ...store
  }
}
