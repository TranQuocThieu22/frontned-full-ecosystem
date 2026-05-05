import { create } from "zustand";

interface ListStore<T> {
    list: T[];
    setList: (items: T[]) => void;
    addItem: (item: T) => void;
    updateItem: (id: keyof T, updatedItem: Partial<T>) => void;
    removeItem: (id: keyof T, value: T[keyof T]) => void;
    clearList: () => void;
}

export function createListStore<T>(idKey: keyof T) {
    return create<ListStore<T>>((set) => ({
        list: [],
        setList: (items) => set({ list: items }),
        addItem: (item) =>
            set((state) => ({
                list: [...state.list, item],
            })),
        updateItem: (id, updatedItem) =>
            set((state) => ({
                list: state.list.map((item) =>
                    item[idKey] === updatedItem[id] ? { ...item, ...updatedItem } : item
                ),
            })),
        removeItem: (id, value) =>
            set((state) => ({
                list: state.list.filter((item) => item[id] !== value),
            })),
        clearList: () => set({ list: [] }),
    }));
}
