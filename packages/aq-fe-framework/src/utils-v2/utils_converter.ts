import { ComboboxData } from '@mantine/core';

type OptionsRecord<T extends string> = Record<T, number>

export const utils_converter = {
    mapEnumToSelectData<T extends Record<string, string | number>>(
        enumObj: T,
        labelMap: Record<string, string>
    ) {
        return Object.entries(enumObj)
            .filter(([key, value]) => isNaN(Number(key))) // Bỏ qua reverse mapping nếu là enum number
            .map(([_, value]) => {
                const stringValue = value.toString();
                return {
                    value: stringValue,
                    label: labelMap[stringValue] ?? `Không rõ (${stringValue})`
                };
            });
    },

    mapOptionsToSelectData<T extends string>(
        options: OptionsRecord<T>,
        t: (key: T) => string
    ): ComboboxData {
        return (Object.keys(options) as T[]).map((key) => ({
            value: options[key].toString(),
            label: t(key),
        }));
    },
    invertObject<TKey extends string | number | symbol, TValue>(options: Record<TKey, TValue>) {
        return Object.fromEntries(
            Object.entries(options).map(([key, value]) => [value, key])
        )
    },
    mapIds<T extends Record<string, any>>(
        values: T[],
        references: {
            [outputKey: string]: {
                data: T[];
                key: keyof T;
                idField?: keyof T;
            };
        }
    ) {
        return values.map((v) => {
            const mappedIds: Record<string, any> = {};
            for (const outputKey in references) {
                const { data, key, idField = "id" } = references[outputKey];
                const match = data.find((d) => d[key] === v[key]);
                mappedIds[outputKey] = match ? match[idField] : null;
            }
            return { ...v, ...mappedIds };
        });
    }
}