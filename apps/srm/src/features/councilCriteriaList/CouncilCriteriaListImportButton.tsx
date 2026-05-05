"use client";

import { evaluationCriteriaSetService } from "@/shared/APIs/evaluationCriteriaSetService";
import { EnumCouncilType, EnumLabelCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { SRMEvaluationCriteriaSet } from "@/shared/interfaces/SRMEvaluationCriteriaSet";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";

const fields: FieldOption<SRMEvaluationCriteriaSet>[] = [
    { fieldKey: "code", fieldName: "Mã bộ tiêu chí", isRequired: true },
    { fieldKey: "name", fieldName: "Tên bộ tiêu chí", isRequired: true },
    { fieldKey: "councilType", fieldName: "Loại hội đồng", parseType: "number" },
    { fieldKey: "srmConclusionSetId", fieldName: "Bộ kết luận", parseType: "number" },
    { fieldKey: "note", fieldName: "Ghi chú" },
];

const configCouncilType: IExcelColumnConfig<{ label: string; value: string }>[] = [
    { fieldKey: "value", fieldName: "Mã loại hội đồng" },
    { fieldKey: "label", fieldName: "Tên loại hội đồng" },
];

export default function CouncilCriteriaListImportButton() {
    return (
        <CustomButtonImport<SRMEvaluationCriteriaSet>
            fields={fields}
            fileName="Mẫu import bộ tiêu chí"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Loại hội đồng",
                    data: converterUtils.mapEnumToSelectData(EnumCouncilType, EnumLabelCouncilType),
                    config: configCouncilType,
                });
            }}
            onSubmit={(finalValues) => {
                const mapped = (finalValues ?? []).map((item) => ({
                    ...item,
                    councilType: Number(item.councilType),
                    srmConclusionSetId: Number(item.srmConclusionSetId),
                }));
                return evaluationCriteriaSetService.createList(mapped);
            }}
        />
    );
}
