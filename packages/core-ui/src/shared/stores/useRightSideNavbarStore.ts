import { create } from 'zustand';
import { NavbarMenuData } from '../interfaces/NavbarMenuData';

interface RightSideNavbarState {
    currentItemId: number | null,
    currentItem: NavbarMenuData<any> | null,
    itemStack: NavbarMenuData<any>[],

}

export interface RightSideNavbarStore {
    rightSideNavbarState: RightSideNavbarState,
    setRightSideNavbarState: (rightSideNavbarState: RightSideNavbarState) => void,
    setCurrentItemId: (itemId: number | null) => void,
    getCurrentItemId: () => number | null,
    setCurrentItem: (item: NavbarMenuData<any> | null) => void,
    getCurrentItem: () => NavbarMenuData<any> | null,
    pushItemToStack: (item: NavbarMenuData<any> | null) => void,
    getLastItemFromStack: () => NavbarMenuData<any> | null | undefined,
    removeLastItemFromStack: () => void,
}


export const useRightSideNavbarStore = create<RightSideNavbarStore>((set, get) => ({
    rightSideNavbarState: {
        currentItemId: null,
        currentItem: null,
        itemStack: []
    },

    setRightSideNavbarState: (rightSideNavbarState: RightSideNavbarState) => set({ rightSideNavbarState }),

    setCurrentItemId: (itemId: number | null) => set((state) => ({
        rightSideNavbarState: {
            ...state.rightSideNavbarState,
            currentItemId: itemId ?? null
        }
    })),

    getCurrentItemId() {
        return get().rightSideNavbarState.currentItemId;
    },

    setCurrentItem: (item: NavbarMenuData<any> | null) => set((state) => ({
        rightSideNavbarState: {
            ...state.rightSideNavbarState,
            currentItem: item ?? null
        }
    })),

    getCurrentItem() {
        return get().rightSideNavbarState.currentItem;
    },

    pushItemToStack: (item: NavbarMenuData<any> | null) => set((state) => ({
        rightSideNavbarState: {
            ...state.rightSideNavbarState,
            itemStack: [...state.rightSideNavbarState.itemStack, item as NavbarMenuData<any>]
        }
    })),

    getLastItemFromStack() {
        return get().rightSideNavbarState.itemStack.at(-1) ?? undefined;
    },

    removeLastItemFromStack: () => set((state) => {
        let currentStack = state.rightSideNavbarState.itemStack;
        currentStack.pop();

        return {
            rightSideNavbarState: {
                ...state.rightSideNavbarState,
                itemStack: currentStack
            }
        }
    })
}))
