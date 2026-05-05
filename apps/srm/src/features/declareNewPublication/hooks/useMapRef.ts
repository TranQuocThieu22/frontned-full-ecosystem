import { useRef } from "react";

export function useMapRef<K, V>(initialEntries?: Iterable<readonly [K, V]>) {
    const mapRef = useRef(new Map<K, V>(initialEntries));

    const set = (key: K, value: V) => {
        mapRef.current.set(key, value);
    };

    const remove = (key: K) => {
        mapRef.current.delete(key);
    };

    const clear = () => {
        mapRef.current.clear();
    };

    const get = (key: K): V | undefined => mapRef.current.get(key);

    const has = (key: K): boolean => mapRef.current.has(key);

    const values = (): V[] => Array.from(mapRef.current.values());

    const filterValues = (predicate: (value: V, key: K) => boolean): V[] => {
        const result: V[] = [];
        for (const [key, value] of mapRef.current.entries()) {
            if (predicate(value, key)) {
                result.push(value);
            }
        }
        return result;
    };

    const entries = (): [K, V][] => Array.from(mapRef.current.entries());

    const keys = (): K[] => Array.from(mapRef.current.keys());

    return {
        map: mapRef.current,
        set,
        remove,
        clear,
        get,
        has,
        values,
        filterValues,
        entries,
        keys,
        get size() {
            return mapRef.current.size;
        },
    } as IUseMapRefController<K, V>;
}

export interface IUseMapRefController<K, V> {
    map: Map<K, V>;
    set: (key: K, value: V) => void;
    get: (key: K) => V | undefined;
    remove: (key: K) => void;
    clear: () => void;
    has: (key: K) => boolean;
    values: () => V[];
    filterValues: (predicate: (value: V, key: K) => boolean) => V[];
    entries: () => [K, V][];
    keys: () => K[];
    readonly size: number;
}
