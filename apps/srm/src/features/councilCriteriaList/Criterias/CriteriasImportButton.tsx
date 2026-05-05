"use client";

import { EnumEvaluationType, EnumLabelEvaluationType } from "@/shared/consts/enum/EnumEvaluationType";
import { EnumGradingSystem, EnumLabelGradingSystem } from "@/shared/consts/enum/EnumGradingSystem";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { notifications } from "@mantine/notifications";
import { Workbook } from "exceljs";

const fields: FieldOption<SRMCriteria>[] = [
    { fieldKey: "code", fieldName: "Mã tiêu chí", isRequired: true },
    { fieldKey: "name", fieldName: "Tên tiêu chí", isRequired: true },
    { fieldKey: "evaluationType", fieldName: "Loại tiêu chí", isRequired: true, parseType: "number" },
    { fieldKey: "gradingSystem", fieldName: "Hệ điểm", parseType: "number" },
    { fieldKey: "maxScore", fieldName: "Điểm tối đa", parseType: "number" },
    { fieldKey: "isRequired", fieldName: "Bắt buộc đánh giá", parseType: "number" },
];

const configEvaluationType: IExcelColumnConfig<{ label: string; value: string }>[] = [
    { fieldKey: "value", fieldName: "Mã loại tiêu chí" },
    { fieldKey: "label", fieldName: "Tên loại tiêu chí" },
];

const configGradingSystem: IExcelColumnConfig<{ label: string; value: string }>[] = [
    { fieldKey: "value", fieldName: "Id hệ điểm" },
    { fieldKey: "label", fieldName: "Tên hệ điểm" },
];

const configIsRequired: IExcelColumnConfig<{ label: string; value: string }>[] = [
    { fieldKey: "value", fieldName: "Bắt buộc đánh giá" },
    { fieldKey: "label", fieldName: "Tên bắt buộc đánh giá" },
];

interface CriteriasImportButtonProps {
    onImport: (criterias: SRMCriteria[]) => void;
    orderMax?: number;
}

export default function CriteriasImportButton({ onImport, orderMax }: CriteriasImportButtonProps) {
    return (
        <CustomButtonImport<SRMCriteria>
            fields={fields}
            fileName="Mẫu import tiêu chí đánh giá"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Loại tiêu chí",
                    data: converterUtils.mapEnumToSelectData(EnumEvaluationType, EnumLabelEvaluationType),
                    config: configEvaluationType,
                });
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Hệ điểm",
                    data: converterUtils.mapEnumToSelectData(EnumGradingSystem, EnumLabelGradingSystem),
                    config: configGradingSystem,
                });
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Bắt buộc đánh giá",
                    data: [
                        { value: "1", label: "Bắt buộc" },
                        { value: "0", label: "Không bắt buộc" },
                    ],
                    config: configIsRequired,
                });
            }}
            onSubmit={(finalValues) => {
                const values = finalValues ?? [];
                const codes = values.map((item) => item.code);
                const duplicateCodes = codes.filter((code, index) => codes.indexOf(code) !== index);
                if (duplicateCodes.length > 0) {
                    notifications.show({
                        title: "Thông báo",
                        message: `Mã tiêu chí bị trùng lặp: ${[...new Set(duplicateCodes)].join(", ")}`,
                        color: "red",
                    });
                    return false;
                }
                const invalidScores = values.filter((item) => {
                    const evaluationType = Number(item.evaluationType);
                    const gradingSystem = Number(EnumLabelGradingSystem[item.gradingSystem as EnumGradingSystem]);
                    const maxScore = Number(item.maxScore);
                    if (evaluationType === EnumEvaluationType.Score) {
                        return maxScore > gradingSystem;
                    }
                    return false;
                });
                if (invalidScores.length > 0) {
                    const invalidCodes = invalidScores.map((item) => item.code).join(", ");
                    notifications.show({
                        title: "Thông báo",
                        message: `Điểm tối đa không được lớn hơn hệ điểm cho các tiêu chí: ${invalidCodes}`,
                        color: "red",
                    });
                    return false;
                }
                const transformed = values.map((item, index) => {
                    const order = orderMax ? orderMax + index + 1 : index + 1;
                    return {
                        ...item,
                        gradingSystem: Number(item.gradingSystem),
                        maxScore: Number(item.maxScore),
                        isRequired: Number(item.isRequired) === 1,
                        evaluationType: Number(item.evaluationType),
                        isEnabled: true,
                        order,
                    };
                });
                onImport(transformed);
                return true;
            }}
        />
    );
}
