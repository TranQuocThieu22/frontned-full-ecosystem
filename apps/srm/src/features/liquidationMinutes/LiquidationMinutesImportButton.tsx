import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { liquidationMinuteService } from "@/shared/APIs/liquidationMinuteService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMLiquidationMinute } from "@/shared/interfaces/SRMLiquidationMinute";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<SRMLiquidationMinute>[] = [
    {
        fieldKey: "srmContractId",
        fieldName: "Id đề tài thanh lý",
        isRequired: true,
    },
    {
        fieldKey: "minuteNumber",
        fieldName: "Số biên bản",
        isRequired: true,
    },
    {
        fieldKey: "liquidationDate",
        fieldName: "Ngày biên bản",
        isRequired: true,
    },
    {
        fieldKey: "proposedBudget",
        fieldName: "Kinh phí đề nghị",
    },
    {
        fieldKey: "refundedBudget",
        fieldName: "Kinh phí hoàn trả",
    },
    {
        fieldKey: "centralBudget",
        fieldName: "Kinh phí TW (Thanh toán)",
    },
    {
        fieldKey: "provincialBudget",
        fieldName: "Kinh phí Tỉnh (Thanh toán)",
    },
    {
        fieldKey: "universityBudget",
        fieldName: "Kinh phí Trường (Thanh toán)",
    },
    {
        fieldKey: "otherBudget",
        fieldName: "Kinh phí Khác (Thanh toán)",
    },
];

const config2: IExcelColumnConfig<{ value: string, label: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "ID đề tài",
    },
    {
        fieldKey: "label",
        fieldName: "Tên đề tài",
    },
];


export default function LiquidationMinutesImportButton() {
    const academicYearStore = useAcademicYearStore();

    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMLiquidationMinute[]) => {
            return liquidationMinuteService.createOrUpdateList(body.map((item) => {
                return {
                    ...item,
                }
            }));
        },
        mutationType: "import",
    });

    const acceptanceCouncilQuery = useCustomReactQuery({
        queryKey: ['acceptanceCouncilQuery_LiquidationMinutesImportButton', academicYearStore?.state?.academicYear?.id],
        axiosFn: () => {
            return acceptanceCouncilService.getContractAccepted({
                AcademicYearId: academicYearStore?.state?.academicYear?.id ?? 0
            });
        },
        options: {
            enabled: !!academicYearStore?.state?.academicYear?.id
        }
    });


    const stack = useModalsStack<ModalImportId>([]);
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<SRMLiquidationMinute>({
            workbook: workbook,
            sheetName: "Danh sách đề tài yêu cầu điều chỉnh",
            data: [],
            config: config,
        });
        await excelUtils.addSheet<{ value: string, label: string }>({
            workbook: workbook,
            sheetName: "Danh sách đề tài thanh lý",
            data: acceptanceCouncilQuery.data?.map(item => (
                {
                    value: item.id!.toString(),
                    label: item?.srmTopic?.registerName || ""
                }
            )) || [],
            config: config2,
        });
        excelUtils.download({ name: "Mẫu Import biên bản thanh lý", workbook });
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired,
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: SRMLiquidationMinute[]) => {
                    finalValues = finalValues.map((item) => {
                        return {
                            ...item,
                            minuteNumber: item.minuteNumber?.toString() || "",
                            proposedBudget: Number(item.proposedBudget || 0),
                            refundedBudget: Number(item.refundedBudget || 0),
                            centralBudget: Number(item.centralBudget || 0),
                            provincialBudget: Number(item.provincialBudget || 0),
                            universityBudget: Number(item.universityBudget || 0),
                            otherBudget: Number(item.otherBudget || 0),
                            totalCost: Number((item.centralBudget || 0) + (item.provincialBudget || 0) + (item.universityBudget || 0) + (item.otherBudget || 0)),
                            academicYearId: academicYearStore?.state?.academicYear?.id || 0,
                            srmContractId: Number(item.srmContractId || 0),
                        }
                    });
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