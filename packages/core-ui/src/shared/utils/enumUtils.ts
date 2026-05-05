/**
 * 
 * Utility to create a typesafe enum-like object with helpful methods.
 * Supports both string and numeric enums, with reverse mapping for numeric enums.
 * @param obj 
 * @returns A typesafe enum-like object with helpful methods.
 */

// ---------------------------
//  Interfaces
// ---------------------------
export interface NumericEnum<T extends Record<string, number>> {
    __meta: {
        isNumeric: true;
        hasReverse: true;
    };
    keyFromValue(value: T[keyof T]): keyof T;
    valueFromKey(key: keyof T): T[keyof T];

    keys(): Array<keyof T>;
    values(): Array<T[keyof T]>;
    entries(): Array<[keyof T, T[keyof T]]>;
    isKey(key: unknown): key is keyof T;
    isValue(value: unknown): value is T[keyof T];
}

export interface StringEnum<T extends Record<string, string>> {
    __meta: {
        isNumeric: false;
        hasReverse: false;
    };

    keys(): Array<keyof T>;
    values(): Array<T[keyof T]>;
    entries(): Array<[keyof T, T[keyof T]]>;
    isKey(key: unknown): key is keyof T;
    isValue(value: unknown): value is T[keyof T];
}

// ---------------------------
//  Overloads
// ---------------------------
export function makeEnum<T extends Record<string, number>>(
    obj: T
): T & NumericEnum<T>;

export function makeEnum<T extends Record<string, string>>(
    obj: T
): T & StringEnum<T>;

// ---------------------------
//  Implementation
// ---------------------------
export function makeEnum(obj: any): any {
    const isNumericEnum = Object.values(obj).every(v => typeof v === "number");

    const keys = Object.keys(obj);
    const values = Object.values(obj);

    const helpers = {
        keys: () => keys as Array<any>,
        values: () => values as Array<any>,
        entries: () => Object.entries(obj) as Array<[any, any]>,
        isKey: (key: unknown) => typeof key === "string" && key in obj,
        isValue: (value: unknown) =>
            (typeof value === "string" || typeof value === "number") &&
            values.includes(value as any),
    };

    // Numeric values enum
    if (isNumericEnum) {
        const reverse: Record<number, string> = {};
        for (const [k, v] of Object.entries(obj)) reverse[v as number] = k;

        return Object.freeze({
            ...obj,
            ...helpers,
            __meta: Object.freeze({ isNumeric: true, hasReverse: true }),
            keyFromValue(value: number) {
                return reverse[value];
            },
            valueFromKey(key: string) {
                return obj[key];
            },
        });
    }

    // String values enum
    return Object.freeze({
        ...obj,
        ...helpers,
        __meta: Object.freeze({ isNumeric: false, hasReverse: false }),
    });
}
