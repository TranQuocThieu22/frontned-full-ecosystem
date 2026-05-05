
export const utils_build = {
    createEnumKeyMap<
        T extends Record<string, number | string>
    >(enumObj: T): Record<Extract<T[keyof T], number>, keyof T> {
        return Object.keys(enumObj)
            .filter((k) => isNaN(Number(k))) // bỏ numeric key
            .reduce((acc, key) => {
                const val = enumObj[key as keyof T] as unknown as number;
                acc[val as Extract<T[keyof T], number>] = key as keyof T;
                return acc;
            }, {} as Record<Extract<T[keyof T], number>, keyof T>);
    }
}




