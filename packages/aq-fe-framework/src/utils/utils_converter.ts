export function utils_converter_mapEnumToSelectData<T extends Record<string, string | number>>(
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
}
export const utils_converter_getLabelByValue = (data: Record<number, string>, value?: number | string): string => {
    const numericValue = Number(value); // Chuyển về number
    return data[numericValue] || "Không xác định";
};

export const utils_converter_getKeyByValue = <K extends string | number, V>(obj: Record<K, V>, value: V): K | undefined => {
    return (Object.entries(obj) as [K, V][]).find(([_, v]) => v === value)?.[0];
};

/**
 * Chuyển đổi enum thành mảng các đối tượng {value, label}
 * @param enumObject - Đối tượng enum cần chuyển đổi
 * @returns Mảng các đối tượng có dạng {value: string, label: string}
 */
export function utils_converter_enumToSelectOptions<T extends Record<string, string | number>>(enumObject: T): Array<{ value: string, label: string }> {
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
}


export function utils_converter_youTubeUrlToEmbed(url: string): string {
    try {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get('v');

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // Trường hợp đã là dạng embed
        if (url.includes('/embed/')) {
            return url;
        }

        return ''; // Không hợp lệ
    } catch (e) {
        return ''; // URL không hợp lệ
    }
}