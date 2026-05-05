import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

interface I {
  // accreditationType?: 'Institutional' | 'Program';
  accreditationType?: "Institutional" | "Program";
}

const useStore = createGenericStore<I>({
  initialState: { accreditationType: "Program" },
  storageKey: "useStore_Global",
});

export function useStore_Global() {
  const store = useStore();

  return {
    ...store,
  };
}
