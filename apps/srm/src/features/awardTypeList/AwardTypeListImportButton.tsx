"use client";

import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { AwardTypeService } from "@/shared/APIs/awardTypeService";
import { SRMAwardType } from "@/shared/interfaces/SRMAwardType";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Workbook } from "exceljs";

type ImportRow = SRMAwardType & { srmAwardLevelCode?: string; isDeactivateNumber?: number };

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "code", fieldName: "Mã loại giải thưởng", isRequired: true },
    { fieldKey: "name", fieldName: "Tên loại giải thưởng", isRequired: true },
    { fieldKey: "srmAwardLevelCode", fieldName: "Mã cấp giải thưởng (Xem sheet Danh sách cấp giải thưởng)", isRequired: true },
    { fieldKey: "order", fieldName: "Thứ tự hiển thị", parseType: "number" },
    { fieldKey: "note", fieldName: "Ghi chú" },
    { fieldKey: "isDeactivateNumber", fieldName: "Không sử dụng (Xem sheet Danh sách trạng thái không sử dụng)", parseType: "number" },
];

const isDeactivateValueConfig: IExcelColumnConfig<{ isDeactivate: string; label: string }>[] = [
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
            resultError.push(`Thiếu thông tin bắt buộc (ở dòng thứ ${idx + 1})`);
            return;
        }
        const value = item[key];
        if (map.has(value)) {
            resultError.push(`Mã loại giải thưởng ${value} ➝ bị trùng lặp`);
            return;
        }
        map.set(value, idx);
        finalValues.push(transform(item));
    });
    return { finalValues, resultError };
}

export default function AwardTypeListImportButton() {
    const queryClient = useQueryClient();

    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Mẫu import loại giải thưởng"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Danh sách trạng thái không sử dụng",
                    data: [
                        { isDeactivate: "TRUE", label: "Không sử dụng" },
                        { isDeactivate: "FALSE", label: "Sử dụng" },
                    ],
                    config: isDeactivateValueConfig,
                });
            }}
            onSubmit={async (values): Promise<AxiosResponse<CustomApiResponse<ImportRow[]>>> => {
                const awardLevelResponse = await AwardLevelService.getAll();
                const awardLevelList = awardLevelResponse.data.data || [];
                const awardLevelMap = Object.fromEntries(awardLevelList.map((lvl: any) => [lvl.code, lvl.id]));

                const mappedValues = (values ?? []).map((item) => ({
                    ...item,
                    srmAwardLevelId: item.srmAwardLevelCode ? awardLevelMap[item.srmAwardLevelCode] : null,
                }));

                const { finalValues, resultError } = checkDataImport(
                    mappedValues,
                    "code",
                    (item) => ({ ...item, isDeactivate: item.isDeactivate ?? item.isDeactivateNumber === 1 }),
                    ["code", "name", "srmAwardLevelId"]
                );

                if (resultError.length !== 0) {
                    throw new Error(resultError.join("\n"));
                }

                const response = await AwardTypeService.createList(finalValues) as AxiosResponse<
                    CustomApiResponse<ImportRow[]>
                >;

                queryClient.invalidateQueries({ queryKey: ["awardTypeQuery"] });

                return response;
            }}
        />
    );
}
