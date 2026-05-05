import { useRef } from "react";

export function useArrayRef<T>(initialItems?: T[]) {
    const arrayRef = useRef<T[]>(initialItems ?? []);

    /** - Clear array and set a new array item to array ref. 
     * - Example: arrayRef.setItems(arrayItem) */
    const setItems = (values: T[]) => {
        arrayRef.current.length = 0;
        arrayRef.current.push(...values);
    }

    /** - Add a item to current array.
     * - Example: arrayRef.addItem(newItem) */
    const addItem = (value: T) => {
        arrayRef.current.push(value);
    };

    /** - Add multiple items to current array.
     * - Example: arrayRef.addListItem([item1, item2]) */
    const addListItem = (values: T[]) => {
        arrayRef.current.push(...values);
    };

    /** - Add multiple items to current array and transformed. */
    const addListItemTranform = (values: T[], tranform?: (item: T) => T) => {
        for (const item of values) {
            arrayRef.current.push(tranform ? tranform(item) : item);
        }
    };

    /** - Update item in the array using item reference.
     * - Example: arrayRef.updateItem(oldItem, newItem) */
    const updateItem = (item: T, value: T) => {
        const index = arrayRef.current.findIndex(i => i === item);
        if (index >= 0) {
            arrayRef.current[index] = value;
        }
    };

    /** - Update fields of the first element in the array ref where predicate is true.
     * - Example: arrayRef.updateItemField(item => item.id === id, {position: "Dev", team: "Dev"}) */
    const updateItemField = (predicate: (item: T) => boolean, updates: Partial<T>): void => {
        const item = arrayRef.current.find(predicate);
        if (item) {
            Object.assign(item, updates);
        }
    }

    /** - Get first item that matches the predicate.
     * - Example: const item = arrayRef.getItem(x => x.id === 1) */
    const getItem = (predicate: (item: T) => boolean): T | undefined => {
        return arrayRef.current.find(predicate);
    };

    /** - Remove all items that match predicate.
     * - Example: arrayRef.removeItems(x => x.isDeleted) */
    const removeItems = (predicate: (item: T) => boolean) => {
        arrayRef.current = arrayRef.current.filter(item => !predicate(item));
    };

    /** - Remove and return items that match predicate.
     * - You can optionally transform items before returning.
     * - Example: const removed = arrayRef.removeAndReturnItems(x => x.isTemp, item => {...item, item.a = b}) */
    const removeAndReturnItems = (predicate: (item: T) => boolean, transform?: (item: T) => T): T[] => {
        const removedItems: T[] = [];
        arrayRef.current = arrayRef.current.filter(item => {
            if (predicate(item)) {
                const value = transform ? transform(item) : item;
                removedItems.push(value);
                return false;
            }
            return true;
        });
        return removedItems;
    };

    /** - Clear all items in the array.
     * - Example: arrayRef.clear() */
    const clear = () => {
        arrayRef.current.length = 0;
    };

    /** - Check if array has at least one item that matches predicate.
     * - Example: const has = arrayRef.hasItem(x => x.code === "A") */
    const hasItem = (predicate: (item: T) => boolean): boolean => {
        return arrayRef.current.some(predicate);
    };

    /** - Get all items in the array.
     * - Example: const list = arrayRef.values() */
    const values = (): T[] => {
        return [...arrayRef.current];
    };

    /** - filter array items that match predicate.
     * - Example: const active = arrayRef.filterValues(x => x.active) */
    const filterValues = (predicate: (item: T) => boolean): T[] => {
        return arrayRef.current.filter(predicate);
    };

    /** - Update multiple items in the array.
     * - Predicate compares items between current array and provided list.
     * - Example: arrayRef.updateList(newItems, (a, b) => a.id === b.id) */
    const updateList = (items: T[], predicate: (a: T, b: T) => boolean) => {
        for (const item of items) {
            const index = arrayRef.current.findIndex(existing => predicate(existing, item));
            if (index >= 0) {
                arrayRef.current[index] = item;
            }
        }
    };

    /** - Find index of a specific item in the array using reference equality.
     * - Example: const idx = arrayRef.findIndex(item) */
    const findIndex = (itemFind: T): number => {
        return arrayRef.current.findIndex(
            item => item === itemFind
        )
    };

    /** - Remove item by reference equality and return it.
     * - Example: const removed = arrayRef.removeAndReturnItem(item) */
    const removeItem = (item: T): T | undefined => {
        const index = arrayRef.current.findIndex(i => i === item);
        if (index !== -1) {
            const [removed] = arrayRef.current.splice(index, 1);
            return removed;
        }
        return undefined;
    };

    /** - Get all items transformed with a custom function.
     * - Optionally concat with an additional array.
     * - Example: arrayRef.valuesTranform(x => ({...x, active: true})) */
    const valuesTranform = (transform: (item: T) => T, arrConcat?: T[]): T[] => {
        const valueToReturn: T[] = []
        for (const item of arrayRef.current) {
            valueToReturn.push(transform(item));
        }
        if (arrConcat) {
            for (const item of arrConcat) {
                valueToReturn.push(transform(item));
            }
        }
        return valueToReturn;
    }

    /** - Clone all items and transform them.
     * - Useful when you need deep copy before transform.
     * - Example: arrayRef.cloneItemsTranform(x => ({...x, updated: true})) */
    const cloneItemsTranform = (transform: (item: T) => T, arrConcat?: T[], filter?: (item: T) => boolean): T[] => {
        const valueToReturn: T[] = []
        for (const item of arrayRef.current) {
            if (filter ? filter(item) : true) { valueToReturn.push(transform(structuredClone(item))) }
        }
        if (arrConcat) {
            for (const item of arrConcat) {
                if (filter ? filter(item) : true) { valueToReturn.push(transform(structuredClone(item))) }
            }
        }
        return valueToReturn;
    }

    /** - Remove item by reference equality and return it.
     * - Example: const removed = arrayRef.arrayHelpers.removeAndReturnItem(array, item) */
    function removeItemHelper<V extends Record<string, any>>(arr: V[], item: V): V | undefined {
        const index = arr.findIndex(i => i === item);
        if (index !== -1) {
            const [removed] = arr.splice(index, 1);
            return removed;
        }
        return undefined;
    };

    return {
        get array() {
            return arrayRef.current;
        },
        setItems,
        findIndex,
        addItem,
        addListItem,
        updateItem,
        getItem,
        removeItems,
        removeAndReturnItems,
        removeItem,
        clear,
        hasItem,
        values,
        filterValues,
        updateList,
        valuesTranform,
        cloneItemsTranform,
        updateItemField,
        addListItemTranform,
        get size() {
            return arrayRef.current.length;
        },
        arrayHelpers: {
            removeItem: removeItemHelper,
        }
    } as IUseArrayRefController<T>;
}

export interface IUseArrayRefController<T> {
    /** - Return arrayRef.current
     * - Example: const current = arrayRef.array */
    array: T[];

    /** - Add a item to current array.
     * - Example: arrayRef.addItem(newItem) */
    addItem: (value: T) => void;

    /** - Clear array and set a new array item to array ref. 
     * - Example: arrayRef.setItems(arrayItem) */
    setItems: (value: T[]) => void;

    /** - Find index of a specific item in the array using reference equality.
     * - Example: const idx = arrayRef.findIndex(item) */
    findIndex: (itemFind: T) => number;

    /** - Add multiple items to current array.
     * - Example: arrayRef.addListItem([item1, item2]) */
    addListItem: (values: T[]) => void;

    /**  - Add multiple items to current array and transformed.  */
    addListItemTranform: (values: T[], transform?: (item: T) => T) => void;

    /** - Update item in the array using item reference.
     * - Example: arrayRef.updateItem(oldItem, newItem) */
    updateItem: (item: T, value: T) => void;

    /** - Get first item that matches the predicate.
     * - Example: const item = arrayRef.getItem(x => x.id === 1) */
    getItem: (predicate: (item: T) => boolean) => T | undefined;

    /** - Remove all items that match predicate.
     * - Example: arrayRef.removeItems(x => x.isDeleted) */
    removeItems: (predicate: (item: T) => boolean) => void;

    /** - Remove and return items that match predicate.
     * - You can optionally transform items before returning.
     * - Example: const removed = arrayRef.removeAndReturnItems(x => x.isTemp, item => {...item, item.a = b}) */
    removeAndReturnItems: (predicate: (item: T) => boolean, transform?: (item: T) => T) => T[];

    /** - Remove item by reference equality and return it.
     * - Example: const removed = arrayRef.removeAndReturnItem(item) */
    removeItem: (item: T) => T | undefined;

    /** - Clear all items in the array.
     * - Example: arrayRef.clear() */
    clear: () => void;

    /** - Check if array has at least one item that matches predicate.
     * - Example: const has = arrayRef.hasItem(x => x.code === "A") */
    hasItem: (predicate: (item: T) => boolean) => boolean;

    /** - Get all items in the array.
     * - Example: const list = arrayRef.values() */
    values: () => T[];

    /** - Get all items transformed with a custom function.
     * - Optionally concat with an additional array.
     * - Example: arrayRef.valuesTranform(x => ({...x, active: true})) */
    valuesTranform: (transform: (item: T) => T, arrConcat?: T[]) => T[];

    /** - Clone all items and transform them.
     * - Useful when you need deep copy before transform.
     * - Example: arrayRef.cloneItemsTranform(x => ({...x, updated: true})) */
    cloneItemsTranform: (transform: (item: T) => T, arrConcat?: T[], filter?: (item: T) => boolean) => T[];

    /** - filter array items that match predicate.
     * - Example: const active = arrayRef.filterValues(x => x.active) */
    filterValues: (predicate: (item: T) => boolean) => T[];

    /** - Update multiple items in the array.
     * - Predicate compares items between current array and provided list.
     * - Example: arrayRef.updateList(newItems, (a, b) => a.id === b.id) */
    updateList: (items: T[], predicate: (a: T, b: T) => boolean) => void;

    /** - Update fields of the first element in the array ref where predicate is true.
     * - Example: arrayRef.updateItemField(item => item.id === id, {position: "Dev", team: "Dev"}) */
    updateItemField: (predicate: (item: T) => boolean, updates: Partial<T>) => void;

    /** - Number of items in the array.
     * - Example: const total = arrayRef.size */
    readonly size: number;

    arrayHelpers: {
        /** - Remove item by reference equality and return it.
         * - Example: const removed = arrayRef.arrayHelpers.removeAndReturnItem(array, item) */
        removeItem: <V extends Record<string, any>>(arr: V[], item: V) => V | undefined;
    }
}
