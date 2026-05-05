"use client";

import { titleService } from "@/shared/APIs/titleService";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";


const fields: FieldOption<SRMTitle>[] = [
    { fieldKey: "code", fieldName: "Mã vai trò", isRequired: true },
    { fieldKey: "name", fieldName: "Tên vai trò", isRequired: true },
    { fieldKey: "isDeactivateValue", fieldName: "Không sử dụng", parseType: "boolean" },
    { fieldKey: "note", fieldName: "Ghi chú" },
];

const isDeactivateConfig: IExcelColumnConfig<{ isDeactivateValue: number; label: string }>[] = [
    { fieldKey: "isDeactivateValue", fieldName: "Giá trị", isRequired: false },
    { fieldKey: "label", fieldName: "Tên giá trị", isRequired: false },
];

export default function TopicRoleListImportButton() {
    return (
        <CustomButtonImport
            fields={fields}
            fileName="Danh sách vai trò thực hiện đề tài"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Danh sách giá trị Không sử dụng",
                    data: [
                        { isDeactivateValue: 0, label: "Sử dụng" },
                        { isDeactivateValue: 1, label: "Không sử dụng" },
                    ],
                    config: isDeactivateConfig,
                });
            }}
            onSubmit={(finalValues) => {
                const mapped = finalValues.map((item) => ({
                    ...item,
                    type: 1,
                    isDeactivate: item.isDeactivateValue,
                }));
                return titleService.createList(mapped);
            }}
        />
    );
}
