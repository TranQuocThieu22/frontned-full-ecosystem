import { analysisTypeEnum } from '@/shared/constants/enum/AnalysisTypeEnum';
import { IExternalAssessment } from '@/shared/interfaces/externalAssessment/IExternalAssessment';
import { service_Department } from '@/shared/APIs/service__department';
import { IImportUpdateEAQTaskDetailAnalyses, service_EAQAnalysis } from '@/shared/APIs/service_EAQAnalysis';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from '@mantine/core';
import ExcelJS from "exceljs";

interface IDepartmentConfig {
    code?: string;
    name?: string;
}

interface ITaskDetailConfig {
    id?: number;
    code?: string;
    name?: string;
    eaqStandardSetCode?: string;
    eaqCriteriaCode?: string;
    eaqLimitationCode?: string;
    eaqLimitationName?: string;
}

const importConfig: IExcelColumnConfig<IImportUpdateEAQTaskDetailAnalyses>[] = [
    { fieldName: "Mã công việc", fieldKey: "eaqTaskDetailCode", isRequired: true, },
    { fieldName: "Mã nhân sự phụ trách", fieldKey: "userCode", isRequired: true, },
    { fieldName: "Thời hạn", fieldKey: "duration" },
    { fieldName: "Kết quả dự kiến", fieldKey: "expectedResult" },
    { fieldName: "Mã đơn vị chủ trì", fieldKey: "hostUnitCode", isRequired: true, },
    { fieldName: "Đơn vị phối hợp", fieldKey: "supportUnit" },
    { fieldName: "Ghi chú", fieldKey: "note" },
];

const taskDetailConfig: IExcelColumnConfig<ITaskDetailConfig>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã công việc",
    },
    {
        fieldKey: "name",
        fieldName: "Tên công việc",
    },
    {
        fieldKey: "eaqStandardSetCode",
        fieldName: "Mã tiêu chuẩn",
    },
    {
        fieldKey: "eaqCriteriaCode",
        fieldName: "Mã tiêu chí",
    },
    {
        fieldKey: "eaqLimitationCode",
        fieldName: "Mã hạn chế",
    },
    {
        fieldKey: "eaqLimitationName",
        fieldName: "Tên hạn chế",
    },
];

const departmentConfig: IExcelColumnConfig<IDepartmentConfig>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã đơn vị",
    },
    {
        fieldKey: "name",
        fieldName: "Tên đơn vị",
    },
];


export default function QualityImprovementActionsUpdateMultiple({ loading }: { loading?: boolean }) {

    const importMutation = useCustomReactMutation({
        axiosFn: (body: IImportUpdateEAQTaskDetailAnalyses[]) => service_EAQAnalysis.importUpdateEAQTaskDetailAnalyses(body),
        mutationType: "import",
    });

    const filterStore = useS_Shared_Filter();

    const taskDetailQuery = useCustomReactQuery({
        queryKey: ["QualityImprovementActionsUpdateMultiple_taskDetailQuery", filterStore.state.Phase?.id],
        axiosFn: async () => service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
            eaqPhaseId: filterStore.state.Phase?.id,
            analysisType: analysisTypeEnum.Limitation
        }),
        options: {
            enabled: !!filterStore.state.Phase?.id
        }
    })

    const departmentQuery = useCustomReactQuery({
        queryKey: ["QualityImprovementActionsUpdateMultiple_departmentQuery"],
        axiosFn: async () => service_Department.getAll(),
    });
    const taskDetailList: ITaskDetailConfig[] = taskDetailQuery.data?.map((item) => (
        {
            code: item.code || "",
            name: item.name || "",
            eaqStandardSetCode: item.eaqAnalysis?.eaqLimitation?.eaqCriteria?.eaqStandard?.code || "",
            eaqCriteriaCode: item.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code || "",
            eaqLimitationCode: item.eaqAnalysis?.eaqLimitation?.code || "",
            eaqLimitationName: item.eaqAnalysis?.eaqLimitation?.name || "",
        }
    )) ?? [];

    const departmentList: IDepartmentConfig[] = departmentQuery.data?.map((item) => ({
        code: item.code || "",
        name: item.name || "",
    })) ?? [];

    const stack = useModalsStack<ModalImportId>([]);

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        excelUtils.addSheet<IExternalAssessment>({
            workbook: workbook,
            sheetName: "Danh sách hạn chế cần cải tiến",
            data: [],
            config: importConfig,
        });
        excelUtils.addSheet<ITaskDetailConfig>({
            workbook: workbook,
            sheetName: "Danh sách công việc",
            data: taskDetailList || [],
            config: taskDetailConfig,
        });
        excelUtils.addSheet<IDepartmentConfig>({
            workbook: workbook,
            sheetName: "Danh sách đơn vị",
            data: departmentList || [],
            config: departmentConfig,
        });
        await excelUtils.download({ name: "Mẫu Import cập nhật phân công cải tiến chất lượng sau đánh giá", workbook });
    };

    const validateInput = (data: IImportUpdateEAQTaskDetailAnalyses[]): string[] => {
        const validationErrors: string[] = [];
        data.forEach((item, index) => {
            const rowNumber = index + 1;
            const currentTaskDetail = taskDetailQuery?.data?.find(
                (d) => d.code === item.eaqTaskDetailCode
            );
            if (!currentTaskDetail) {
                validationErrors.push(
                    `Dòng ${rowNumber}: Mã công việc không được để trống`
                );
            }
        });
        return validationErrors;
    };
    return (
        <>
            <MyModalImport
                fieldDefinition={importConfig.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}

                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: IImportUpdateEAQTaskDetailAnalyses[]) => {
                    // const validationErrors = validateInput(finalValues)
                    // if (validationErrors.length > 0) {
                    //     notifications.show({
                    //         color: "red",
                    //         title: "Lỗi validation dữ liệu",
                    //         message: (
                    //             <ScrollArea h={100} type="hover" scrollbarSize={2}>
                    //                 <List size="sm" spacing="xs">
                    //                     {validationErrors.map((item, idx) => (
                    //                         <List.Item key={idx}>{item}</List.Item>
                    //                     ))}
                    //                 </List>
                    //             </ScrollArea>
                    //         ),
                    //         autoClose: true,
                    //     });
                    //     stack.closeAll();
                    //     return;
                    // }

                    const mappedValues: IImportUpdateEAQTaskDetailAnalyses[] = finalValues.map((value) => {
                        const taskDetail = taskDetailQuery.data?.find(
                            (item) => item.code === value.eaqTaskDetailCode
                        )
                        return {
                            eaqTaskDetailCode: taskDetail?.code?.toString() || '',
                            userCode: value.userCode?.toString() || '',
                            duration: value.duration?.toString() || '',
                            expectedResult: value.expectedResult?.toString() || '',
                            hostUnitCode: value.hostUnitCode?.toString() || '',
                            supportUnit: value.supportUnit?.toString() || '',
                            note: value.note?.toString() || '',
                        };
                    });
                    importMutation.mutate(mappedValues, {
                        onSuccess: () => {
                            stack.closeAll();
                        },
                    });
                }}
            />
            <CustomButton actionType="update" onClick={() => stack.open("FileImportConfig")}
                loading={importMutation.isPending || loading} />
        </>
    );
}
