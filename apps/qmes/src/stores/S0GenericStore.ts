import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Generic Store Definition
interface GenericStore<T> {
    state: T;
    setState: (newState: T) => void;
    setProperty: <K extends keyof T>(key: K, value: T[K]) => void;
    resetState: () => void;
};

// Function to Create Generic Store
export function createGenericStore<T>(initialState: T, storageKey: string) {
    return create(
        persist<GenericStore<T>>(
            (set) => ({
                state: initialState,
                setState(newState: T) {
                    set({ state: newState })
                },
                setProperty<K extends keyof T>(key: K, value: T[K]) {
                    set((store) => ({ state: { ...store.state, [key]: value } }))
                },
                resetState: () => set(({ state: initialState })),
            }),
            { name: storageKey }
        ));
}
