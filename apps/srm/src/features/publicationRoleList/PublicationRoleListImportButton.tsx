"use client";

import { titleService } from "@/shared/APIs/titleService";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";


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

export default function PublicationRoleListImportButton() {
    return (
        <CustomButtonImport<SRMTitle>
            fields={fields}
            fileName="Danh sách vai trò thực hiện công bố"

            onSubmit={(finalValues) => {
                const mapped = finalValues.map((item) => ({
                    ...item,
                    type: 2,
                    isDeactivate: item.isDeactivateValue,
                }));
                return titleService.createList(mapped);
            }}
        />
    );
}
