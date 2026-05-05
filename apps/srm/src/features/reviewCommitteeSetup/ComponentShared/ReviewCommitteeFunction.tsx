import { SRMReviewCommittee } from "@/shared/interfaces/SRMReviewCommittee";
import { Text } from "@mantine/core";

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


export function convertErrorsToMessages(errors: Record<string, string>, body: SRMReviewCommittee[]): string[] {
    return Object.entries(errors).map(([key, value]) => {
        // lấy index từ key: "[0].Code" => 0
        const match = key.match(/\[(\d+)\]/);
        const index = match ? parseInt(match[1] || "", 10) : 0;
        const code = body[index]?.code || "";
        return `Mã ${code} ➝ ${value}`;
    });
}

export function checkDataImportBeforeSendApi<T extends Record<string, any>>(
    values: T[],
    key: keyof T,
    label: string,
    transform: (item: T) => T,
    requiredFields: (keyof T)[],
) {
    const map = new Map<any, number>();
    const resultError: string[] = [];
    const finalValues: T[] = [];

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

        // kiểm tra trùng key trong menuData import
        const value = item[key];
        if (map.has(value)) {
            resultError.push(`${label} "${value}" ➝ bị trùng lặp trong file import`);
            return;
        } else {
            map.set(value, idx);
        }

        // chỉ push nếu item hợp lệ
        finalValues.push(transform(item));
    });

    return { finalValues, resultError };
}
