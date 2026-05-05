"use client";

import { conclusionService } from "@/shared/APIs/conclusionService";
import { SRMConclusionSet } from "@/shared/interfaces/SRMConclusionSet";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useQueryClient } from "@tanstack/react-query";
import { Workbook } from "exceljs";

type ImportRow = SRMConclusionSet & { isDeactivateNumber?: number };

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "code", fieldName: "Mã bộ kết luận", isRequired: true },
    { fieldKey: "name", fieldName: "Tên bộ kết luận", isRequired: true },
    { fieldKey: "note", fieldName: "Ghi chú" },
    { fieldKey: "isDeactivateNumber", fieldName: "Không sử dụng (Xem chú thích Danh sách trạng thái không sử dụng)", parseType: "number" },
];

const isDeactivateValueConfig: IExcelColumnConfig<{ isDeactivate: number; label: string }>[] = [
    { fieldKey: "isDeactivate", fieldName: "Giá trị", isRequired: false },
    { fieldKey: "label", fieldName: "Tiêu đề", isRequired: false },
];

function checkDataImport<T extends Record<string, any>>(
    values: T[],
    key: keyof T,
    transform: (item: T) => T,
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
        const value = item[key];
        if (map.has(value)) {
            resultError.push(`Mã ${value} ➝ bị trùng lặp trong file import`);
            return;
        }
        map.set(value, idx);
        finalValues.push(transform(item));
    });
    return { finalValues, resultError };
}

export default function ConclusionSetImportButton() {
    const queryClient = useQueryClient();

    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Mẫu import bộ kết luận hội đồng"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Danh sách trạng thái không sử dụng",
                    data: [
                        { isDeactivate: 1, label: "Không sử dụng" },
                        { isDeactivate: 0, label: "Sử dụng" },
                    ],
                    config: isDeactivateValueConfig,
                });
            }}
            onSubmit={(values) => {
                const { finalValues, resultError } = checkDataImport(
                    values ?? [],
                    "code",
                    (item) => ({ ...item, isDeactivate: item.isDeactivateNumber === 1 }),
                    ["code", "name"]
                );
                if (resultError.length !== 0) {
                    return Promise.reject(new Error(resultError.join("\n")));
                }
                const promise = conclusionService.createList(finalValues);
                promise.then(() => {
                    queryClient.invalidateQueries({ queryKey: ["ConclusionSetList"] });
                });
                return promise;
            }}
        />
    );
}
