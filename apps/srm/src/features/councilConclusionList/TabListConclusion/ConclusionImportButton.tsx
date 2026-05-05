"use client";

import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";

interface Props {
    srmConclusionSetId?: number;
    handleCreateListConclusion: (list: SRMConclusion[]) => void;
    listConclusionCurrent: SRMConclusion[];
}

type ImportRow = SRMConclusion & { isPassNumber?: number };

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "code", fieldName: "Mã kết luận", isRequired: true },
    { fieldKey: "name", fieldName: "Tên kết luận", isRequired: true },
    { fieldKey: "note", fieldName: "Ghi chú" },
    { fieldKey: "color", fieldName: "Màu sắc hiển thị (Mã màu hệ HEX/RGB/HSL/Tên màu HTML)" },
    { fieldKey: "isPassNumber", fieldName: "Đạt (Xem chú thích Danh sách trạng thái đạt)", parseType: "number" },
];

const isPassValueConfig: IExcelColumnConfig<{ isPass: number; label: string }>[] = [
    { fieldKey: "isPass", fieldName: "Giá trị", isRequired: false },
    { fieldKey: "label", fieldName: "Tiêu đề", isRequired: false },
];

function checkDataImport<T extends Record<string, any>>(
    values: T[],
    key: keyof T,
    label: string,
    transform: (item: T) => T,
    duplicateCheck: (item: T) => boolean,
    requiredFields: (keyof T)[]
): { finalValues: T[]; resultError: string[] } {
    const map = new Map<any, number>();
    const resultError: string[] = [];
    const finalValues: T[] = [];

    values.forEach((item, idx) => {
        const missing = requiredFields.some((f) => {
            const v = item[f];
            return !v || String(v).trim() === "";
        });
        if (missing) {
            resultError.push(`Thiếu thông tin bắt buộc (ở dòng thứ ${idx + 1} tính từ dòng dữ liệu bắt đầu)`);
            return;
        }
        if (duplicateCheck(item)) {
            resultError.push(`${label} ${item[key]} đã tồn tại`);
            return;
        }
        const value = item[key];
        if (map.has(value)) {
            resultError.push(`${label} ${value} ➝ bị trùng lặp trong file import`);
            return;
        }
        map.set(value, idx);
        finalValues.push(transform(item));
    });
    return { finalValues, resultError };
}

export default function ConclusionImportButton({
    srmConclusionSetId,
    handleCreateListConclusion,
    listConclusionCurrent,
}: Props) {
    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Mẫu import kết luận"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Danh sách trạng thái đạt",
                    data: [
                        { isPass: 0, label: "Không đạt" },
                        { isPass: 1, label: "Đạt" },
                    ],
                    config: isPassValueConfig,
                });
            }}
            onSubmit={(values) => {
                const { finalValues, resultError } = checkDataImport(
                    values ?? [],
                    "code",
                    "Mã",
                    (item) => ({
                        ...item,
                        srmConclusionSetId,
                        isPass: item.isPassNumber === 1,
                    }),
                    (item) => listConclusionCurrent.some((i) => i.code === item.code),
                    ["code", "name"]
                );
                if (resultError.length !== 0) {
                    return Promise.reject(new Error(resultError.join("\n")));
                }
                handleCreateListConclusion(finalValues);
                return true;
            }}
        />
    );
}
