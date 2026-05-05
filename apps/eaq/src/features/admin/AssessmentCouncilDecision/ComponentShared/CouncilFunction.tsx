import {Text} from "@mantine/core";

// helper để rút gọn danh sách
export const formatListMessage = (arr: string[], color: string) => {
    if (arr.length === 0) return null;

    const displayCount = 10;
    const visibleItems = arr.slice(0, displayCount);
    const hiddenCount = arr.length - displayCount;

    return (
        <Text fw={700} c={color} span>
            {visibleItems.join(", ")}
            {hiddenCount > 0 && ` ... và ${hiddenCount} viên chức khác`}
        </Text>
    );
};

export function convertErrorsImport(errors: Record<string, string>, body: any[]): string[] {
    return Object.entries(errors).map(([key, value]) => {
        // lấy index từ key: "[0].Code" => 0
        const match = key.match(/\[(\d+)\]/);
        const index = match ? parseInt(match[1] || "", 10) : 0;
        const code = body[index]?.code || "";
        return `Mã ${code} ➝ ${value}`;
    });
}


export function checkDataImport<T extends Record<string, any>>({
    values, keyCheckDuplicate, labelCheckDuplicate, validateFn, transform, requiredFields
}: {
    values: T[],
    keyCheckDuplicate?: keyof T,
    labelCheckDuplicate?: string,
    validateFn?: (item: T, resultError: string[], index: number) => boolean,
    transform?: (item: T) => T,
    requiredFields?: (keyof T)[]
}
) {
    const map = new Map<any, number>();
    const resultError: string[] = [];
    const finalValues: T[] = [];

    values.forEach((item, idx) => {
        // kiểm tra field bắt buộc
        const missing = requiredFields?.some(f => {
            const v = item[f];
            return !v || String(v).trim() === "";
        });

        if (missing) {
            resultError.push(`Thiếu thông tin bắt buộc (ở dòng thứ ${idx + 1} tính từ dòng dữ liệu bắt đầu)`);
            return;
        }

        if (validateFn && !validateFn(item, resultError, idx)) {
            return;
        }

        if (keyCheckDuplicate) {
            // kiểm tra trùng key trong menuData import
            const value = item[keyCheckDuplicate];
            if (map.has(value)) {
                resultError.push(`${labelCheckDuplicate} ${value} ➝ bị trùng lặp trong file import`);
                return;
            } else {
                map.set(value, idx);
            }
        }

        // chỉ push nếu item hợp lệ
        finalValues.push(transform ? transform(item) : item);
    });

    return { finalValues, resultError };
}

export function checkFieldRequiredImport<T extends Record<string, any>>(
    values: T[],
    requiredFields: (keyof T)[],
) {
    const resultError: string[] = [];

    values.forEach((item, idx) => {
        // kiểm tra field bắt buộc
        const missing = requiredFields.some(f => {
            const v = item[f];
            return !v || String(v).trim() === "";
        });

        if (missing) {
            resultError.push(`Thiếu thông tin bắt buộc (ở dòng thứ ${idx + 1} tính từ dòng dữ liệu bắt đầu)`);
            return;
        }
    });

    return { resultError };
}


export function checkDataImportOnClient<T extends Record<string, any>>(
    values: T[],
    key: keyof T,
    label: string,
    transform: (item: T) => T,
    duplicateCheck: (item: T) => boolean,
    requiredFields: (keyof T)[],
) {
    const map = new Map<any, number>();
    const resultError: string[] = [];
    const finalValues: T[] = [];

    values.forEach((item, idx) => {
        let isValid = true;
        // kiểm tra field bắt buộc
        const missing = requiredFields.some(f => {
            const v = item[f];
            return !v || String(v).trim() === "";
        });

        if (missing) {
            resultError.push(`Thiếu thông tin bắt buộc (ở dòng thứ ${idx + 1} tính từ dòng dữ liệu bắt đầu)`);
            return;
        }

        // kiểm tra trùng mã
        if (duplicateCheck(item)) {
            resultError.push(`${label} ${item[key]} đã tồn tại`);
            isValid = false;
        }

        // kiểm tra trùng key trong menuData import
        const value = item[key];
        if (map.has(value)) {
            resultError.push(`${label} ${value} ➝ bị trùng lặp trong file import`);
            return;
        } else {
            map.set(value, idx);
        }

        // chỉ push nếu item hợp lệ
        if (isValid) {
            finalValues.push(transform(item));
        }
    });

    return { finalValues, resultError };
}
