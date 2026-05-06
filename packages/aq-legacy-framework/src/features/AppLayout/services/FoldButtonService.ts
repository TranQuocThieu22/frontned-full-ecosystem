import { NavbarMenuData } from "@aq-fe/aq-legacy-framework/shared/interfaces/NavbarMenuData";
import { RightSideNavbarStore, useRightSideNavbarStore } from "@aq-fe/aq-legacy-framework/shared/stores/useRightSideNavbarStore";
import { findDimensionPathByItemId } from "./MenuItemService";

interface BuildDimensionsFromPathProps<TPageNameLanguageKey> {
    path: NavbarMenuData<TPageNameLanguageKey>[],
    menuData: NavbarMenuData<TPageNameLanguageKey>[]
}

interface RestoreActiveDimensionsProps<TPageNameLanguageKey> {
    menuData: NavbarMenuData<TPageNameLanguageKey>[]
    rightSideNavbarStore: RightSideNavbarStore
}

/**
 * Build the dimensions list and stack items from a menu item path.
 */
export const deriveDimensionsFromPath = <TPageNameLanguageKey>({ path, menuData }: BuildDimensionsFromPathProps<TPageNameLanguageKey>) => {
    const dimensions: NavbarMenuData<TPageNameLanguageKey>[][] = [menuData];
    const dimensionStackItems: NavbarMenuData<TPageNameLanguageKey>[] = [];

    path.forEach((item) => {
        if (item.itemType === 'new-dimension' && item.items) {
            dimensions.push(item.items);
            dimensionStackItems.push(item);
        }
    });

    return { dimensions, dimensionStackItems };
};

/**
 * Restore dimension data for the current active item and sync the stack in the store.
 */
export const restoreDimensionsForActiveItem = <TPageNameLanguageKey>({ menuData, rightSideNavbarStore }: RestoreActiveDimensionsProps<TPageNameLanguageKey>) => {

    const currentId = rightSideNavbarStore.getCurrentItemId();
    if (!currentId) return;

    const dimensionPath = findDimensionPathByItemId(menuData, currentId);
    if (!dimensionPath) return;

    const { dimensions, dimensionStackItems } = deriveDimensionsFromPath({ path: dimensionPath, menuData });

    rightSideNavbarStore.setRightSideNavbarState({
        ...rightSideNavbarStore.rightSideNavbarState,
        itemStack: dimensionStackItems
    });
    return dimensions;
}

/**
 * Open ancestor dropdowns for a given dimension id and close unrelated ones.
 */
export const openParentDropdownForDimension = (dimensionId?: number) => {
    const dropdowns = Array.from(
        document.querySelectorAll<HTMLElement>('[data-menu-have-dropdown]')
    );

    const keepOpen = new Set<HTMLElement>();
    dropdowns.forEach(dropdown => {
        const childrenContainer = dropdown.nextElementSibling;

        if (!childrenContainer) return;
        const containsActive = childrenContainer.querySelector(`[data-new-dimension-id="${dimensionId}"]`) !== null;

        if (containsActive) {
            keepOpen.add(dropdown);
        }
    });

    keepOpen.forEach(dropdown => {
        if (dropdown.dataset.expanded !== 'true') {
            dropdown.click();
        }
    });

    dropdowns.forEach(dropdown => {
        const isExpanded = dropdown.dataset.expanded === 'true';
        const shouldKeep = keepOpen.has(dropdown);

        if (isExpanded && !shouldKeep) {
            dropdown.click();
        }
    });
}

/**
 * Close dropdowns that do not contain the active item, keep parents of the active item open.
 */
export const closeDropdownsWithoutActiveChildren = () => {
    const activeElement = document.querySelector<HTMLElement>(
        '[data-active="true"][data-children-menu-level]'
    );
    const dropdowns = Array.from(
        document.querySelectorAll<HTMLElement>('[data-menu-have-dropdown]')
    );

    if (!activeElement) {
        dropdowns.forEach(element => {
            if (element.dataset.expanded === 'true') {
                element.click();
            }
        });
        return;
    }

    const keepOpen = new Set<HTMLElement>();
    dropdowns.forEach(dropdown => {
        const childrenContainer = dropdown.nextElementSibling;

        if (!childrenContainer) return;
        const containsActive = childrenContainer.querySelector('[data-active="true"][data-children-menu-level]') !== null;

        if (containsActive) {
            keepOpen.add(dropdown);
        }
    });

    keepOpen.forEach(dropdown => {
        if (dropdown.dataset.expanded !== 'true') {
            dropdown.click();
        }
    });

    dropdowns.forEach(dropdown => {
        const isExpanded = dropdown.dataset.expanded === 'true';
        const shouldKeep = keepOpen.has(dropdown);

        if (isExpanded && !shouldKeep) {
            dropdown.click();
        }
    });
}
