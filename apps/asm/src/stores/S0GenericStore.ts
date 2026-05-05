import { create } from "zustand";
import { persist } from "zustand/middleware";

// Generic Store Definition
interface GenericStore<T> {
  state: T;
  setState: (newState: T) => void;
  setProperty: <K extends keyof T>(key: K, value: T[K]) => void;
  toggleProperty: <K extends keyof T>(key: K) => void;
  resetState: () => void;
  push: <K extends keyof T>(key: K, value: T[K] extends (infer U)[] ? U : never) => void;
}

// Function to Create Generic Store
export function createGenericStore<T>(initialState: T, storageKey: string) {
  return create(
    persist<GenericStore<T>>(
      (set) => ({
        state: initialState,
        setState(newState: T) {
          set({ state: newState });
        },
        setProperty<K extends keyof T>(key: K, value: T[K]) {
          set((store) => ({ state: { ...store.state, [key]: value } }));
        },
        toggleProperty<K extends keyof T>(key: K) {
          set((store) => {
            const currentValue = store.state[key];
            if (typeof currentValue === "boolean") {
              return { state: { ...store.state, [key]: !currentValue } };
            }
            console.warn(`Cannot toggle non-boolean property "${String(key)}".`);
            return store;
          });
        },
        resetState: () => set({ state: initialState }),
        push: <K extends keyof T>(key: K, value: T[K] extends (infer U)[] ? U : never) => {
          set((store) => {
            const currentArray = store.state[key];
            if (Array.isArray(currentArray)) {
              if (!currentArray.includes(value)) {
                return { state: { ...store.state, [key]: [...currentArray, value] } };
              } else {
                console.warn(`Value "${value}" already exists in the array at "${String(key)}".`);
              }
            } else {
              console.warn(`Property "${String(key)}" is not an array.`);
            }
            return store;
          });
        },
      }),
      { name: storageKey }
    )
  );
}
