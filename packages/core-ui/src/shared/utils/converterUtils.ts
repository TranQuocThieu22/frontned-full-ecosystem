
const convertFlatToNested = <T extends Record<string, any>>(flatObj: T): any => {
    const result: Record<string, any> = {};

    for (const key in flatObj) {
        if (Object.prototype.hasOwnProperty.call(flatObj, key)) {
            const keys = key.split('.');
            let current: Record<string, any> = result;

            for (let i = 0; i < keys.length - 1; i++) {
                const currentKey = keys[i];
                if (currentKey && !current[currentKey]) {
                    current[currentKey] = {};
                }
                if (currentKey) {
                    current = current[currentKey];
                }
            }

            const lastKey = keys[keys.length - 1];
            if (lastKey) {
                current[lastKey] = flatObj[key];
            }
        }
    }

    return result;
};
export const converterUtils = {
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
    enumToSelectOptions<T extends Record<string, string | number>>(enumObject: T): Array<{ value: string, label: string }> {
        const result: Array<{ value: string, label: string }> = [];

        // Lọc các key là string và value là number (các key enum thông thường)
        const numericEnumKeys = Object.keys(enumObject).filter(key => isNaN(Number(key)));

        for (const key of numericEnumKeys) {
            const enumValue = enumObject[key];
            if (typeof enumValue === 'number') {
                // Thêm cặp value-label vào mảng kết quả
                result.push({
                    value: String(enumValue),
                    label: key
                });
            }
        }

        return result;
    },
    getLabelByValue(data: Record<number, string>, value?: number | string): string {
        const numericValue = Number(value); // Chuyển về number
        return data[numericValue] || "Không xác định";
    },
    convertFlatToNested
}


