"use client";

import { EnumEvaluationType, EnumLabelEvaluationType } from "@/shared/consts/enum/EnumEvaluationType";
import { EnumGradingSystem, EnumLabelGradingSystem } from "@/shared/consts/enum/EnumGradingSystem";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<SRMCriteria>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã tiêu chí",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên tiêu chí",
        isRequired: true,
    },
    {
        fieldKey: "evaluationType",
        fieldName: "Loại tiêu chí",
        isRequired: true,
    },
    {
        fieldKey: "gradingSystem",
        fieldName: "Hệ điểm",
    },
    {
        fieldKey: "maxScore",
        fieldName: "Điểm tối đa",
    },
    {
        fieldKey: "isRequired",
        fieldName: "Bắt buộc đánh giá",
    },
];

const configEvaluationType: IExcelColumnConfig<{ label: string, value: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "Mã loại tiêu chí",
    },
    {
        fieldKey: "label",
        fieldName: "Tên loại tiêu chí",
    },
];

const configGradingSystem: IExcelColumnConfig<{ label: string, value: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "Id hệ điểm",
    },

    {
        fieldKey: "label",
        fieldName: "Tên hệ điểm",
    },
];

const configIsRequired: IExcelColumnConfig<{ label: string, value: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "Bắt buộc đánh giá",
    },

    {
        fieldKey: "label",
        fieldName: "Tên bắt buộc đánh giá",
    },
];

interface CriteriasImportButtonProps {
    onImport: (criterias: SRMCriteria[]) => void,
    orderMax?: number
}

export default function CriteriasImportButton({ onImport, orderMax }: CriteriasImportButtonProps) {
    const stack = useModalsStack<ModalImportId>([]);

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<SRMCriteria>({
            workbook: workbook,
            sheetName: "Danh sách tiêu chí đánh giá",
            data: [],
            config: config,
        });
        await excelUtils.addSheet<{ label: string, value: string }>({
            workbook: workbook,
            sheetName: "Loại tiêu chí",
            data: converterUtils.mapEnumToSelectData(EnumEvaluationType, EnumLabelEvaluationType),
            config: configEvaluationType,
        });
        await excelUtils.addSheet<{ label: string, value: string }>({
            workbook: workbook,
            sheetName: "Hệ điểm",
            data: converterUtils.mapEnumToSelectData(EnumGradingSystem, EnumLabelGradingSystem),
            config: configGradingSystem,
        });

        await excelUtils.addSheet<{ label: string, value: string }>({
            workbook: workbook,
            sheetName: "Bắt buộc đánh giá",
            data: [
                { value: '1', label: 'Bắt buộc' },
                { value: '0', label: 'Không bắt buộc' },
            ],
            config: configIsRequired,
        });

        excelUtils.download({ name: "Mẫu import tiêu chí đánh giá", workbook });
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: SRMCriteria[]) => {
                    // Kiểm tra mã code trùng lặp
                    const codes = finalValues.map(item => item.code);
                    const duplicateCodes = codes.filter((code, index) => codes.indexOf(code) !== index);

                    if (duplicateCodes.length > 0) {
                        notifications.show({
                            title: 'Thông báo',
                            message: `Mã tiêu chí bị trùng lặp: ${duplicateCodes.join(', ')}`,
                            color: 'red',
                        })
                        return;
                    }

                    // Kiểm tra maxScore có lớn hơn gradingSystem không
                    const invalidScores = finalValues.filter(item => {
                        const evaluationType = Number(item.evaluationType);
                        const gradingSystem = Number(EnumLabelGradingSystem[item.gradingSystem as EnumGradingSystem]);
                        const maxScore = Number(item.maxScore);

                        // Chỉ kiểm tra khi evaluationType là Score
                        if (evaluationType === EnumEvaluationType.Score) {
                            return maxScore > gradingSystem;
                        }
                        return false;
                    });

                    if (invalidScores.length > 0) {
                        const invalidCodes = invalidScores.map(item => item.code).join(', ');
                        notifications.show({
                            title: 'Thông báo',
                            message: `Điểm tối đa không được lớn hơn hệ điểm cho các tiêu chí: ${invalidCodes}`,
                            color: 'red',
                        })
                        return;
                    }

                    const values = finalValues.map((item, index) => {
                        const order = orderMax ? orderMax + index + 1 : index + 1;

                        return {
                            ...item,
                            gradingSystem: Number(item.gradingSystem),
                            maxScore: Number(item.maxScore),
                            isRequired: Number(item.isRequired) === 1,
                            evaluationType: Number(item.evaluationType),
                            isEnabled: true,
                            order
                        };
                    });
                    onImport(values)
                    stack.closeAll()
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
        </>
    );
}
