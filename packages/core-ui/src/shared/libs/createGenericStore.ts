import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GenericStore<T> {
    state: T;
    setState: (newState: T) => void;
    setProperty: <K extends keyof T>(key: K, value: T[K]) => void;
    resetState: () => void;
}

export function createGenericStore<T>({
    initialState,
    storageKey,
    persistOptions,
}: {
    initialState: T;
    storageKey?: string;
    // Optional extra options for Zustand `persist`, e.g. `partialize` to avoid persisting large fields.
    persistOptions?: any;
}) {
    const storeCreator = (set: any) => ({
        state: initialState,
        setState: (newState: T) => set({ state: newState }),
        setProperty: <K extends keyof T>(key: K, value: T[K]) =>
            set((store: GenericStore<T>) => ({ state: { ...store.state, [key]: value } })),
        resetState: () => set({ state: initialState }),
    });

    return storageKey
        ? create(
            persist<GenericStore<T>>(storeCreator, {
                name: storageKey,
                ...persistOptions,
            }),
        )
        : create<GenericStore<T>>(storeCreator);
}
