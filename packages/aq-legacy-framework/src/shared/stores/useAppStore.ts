import { create } from 'zustand';

interface AppState {
    currentPageId?: number | null
}

interface AppStore {
    appState: AppState,
    setAppState: (appState: AppState) => void,
    setCurrentPage: (pageId: number | null | undefined) => void,
    getCurrentPage: () => number | null | undefined
}


export const useAppStore = create<AppStore>((set, get) => ({
    appState: {
        currentPage: null
    },
    setAppState: (appState: AppState) => set({ appState }),
    setCurrentPage: (pageId: number | null | undefined) => set((appState) => ({
        appState: {
            ...appState,
            currentPageId: pageId ?? null
        }
    })),
    getCurrentPage() {
        return get().appState.currentPageId;
    },
}))
