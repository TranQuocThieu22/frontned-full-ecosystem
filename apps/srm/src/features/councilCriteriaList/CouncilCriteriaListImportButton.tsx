"use client";

import { conclusionService } from "@/shared/APIs/conclusionService";
import { evaluationCriteriaSetService } from "@/shared/APIs/evaluationCriteriaSetService";
import { EnumCouncilType, EnumLabelCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { SRMEvaluationCriteriaSet } from "@/shared/interfaces/SRMEvaluationCriteriaSet";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<SRMEvaluationCriteriaSet>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã bộ tiêu chí",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên bộ tiêu chí",
        isRequired: true,
    },
    {
        fieldKey: "councilType",
        fieldName: "Loại hội đồng",
    },
    {
        fieldKey: "srmConclusionSetId",
        fieldName: "Bộ kết luận",
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
    },
];

const configCouncilType: IExcelColumnConfig<{ label: string, value: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "Mã loại hội đồng",
    },
    {
        fieldKey: "label",
        fieldName: "Tên loại hội đồng",
    },
];

const configConclusionSet: IExcelColumnConfig<{ label: string, value: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "Id bộ kết luận",
    },

    {
        fieldKey: "label",
        fieldName: "Tên bộ kết luận",
    },
];

export default function CouncilCriteriaListImportButton() {
    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMEvaluationCriteriaSet[]) => {
            return evaluationCriteriaSetService.createOrUpdateList(body.map((item) => ({
                ...item,
                councilType: Number(item.councilType),
                srmConclusionSetId: Number(item.srmConclusionSetId),
            })));
        },
        mutationType: "import",
    });

    const stack = useModalsStack<ModalImportId>([]);

    const conclusionQuery = useCustomReactQuery({
        queryKey: ['conclusionQuery'],
        axiosFn: () => conclusionService.getAll()
    })

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<SRMEvaluationCriteriaSet>({
            workbook: workbook,
            sheetName: "Danh sách bộ tiêu chí",
            data: [],
            config: config,
        });
        await excelUtils.addSheet<{ label: string, value: string }>({
            workbook: workbook,
            sheetName: "Loại hội đồng",
            data: converterUtils.mapEnumToSelectData(EnumCouncilType, EnumLabelCouncilType),
            config: configCouncilType,
        });
        await excelUtils.addSheet<{ label: string, value: string }>({
            workbook: workbook,
            sheetName: "Bộ kết luận",
            data: conclusionQuery.data?.map((item) => ({
                value: item.id?.toString() ?? "",
                label: item.name ?? "",
            })) || [],
            config: configConclusionSet,
        });
        excelUtils.download({ name: "Mẫu import bộ tiêu chí", workbook });
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
                onExecute={(finalValues: SRMEvaluationCriteriaSet[]) => {
                    importMutation.mutate(finalValues, {
                        onSuccess: () => {
                            stack.closeAll();
                        },
                    });
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
        </>
    );
}
