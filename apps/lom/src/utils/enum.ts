export const makeEnum = <const T extends Record<string, number>>(obj: T) => {
    const reverse = Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [v, k])
    ) as Record<T[keyof T], keyof T>;

    return { ...obj, ...reverse } as const;
}

export type ValueOfEnum<T> = T[keyof Omit<T, number>];

export type KeyOfEnum<T> = keyof Omit<T, number>;
