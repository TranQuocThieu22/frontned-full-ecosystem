export type NestedKeys<T, Prefix extends string = ""> = {
    [K in keyof T]: T[K] extends object
    ? NestedKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];