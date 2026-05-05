import { contractDetailService } from "@/shared/APIs/contractDetailService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<SRMContractDetail>[] = [
    {
        fieldKey: "srmContractId",
        fieldName: "Mã đề tài",
        isRequired: true,
    },
    {
        fieldKey: "amendmentContent",
        fieldName: "Nội dung điều chỉnh (giải trình lý do và nội dung thay đổi)",
    },
    {
        fieldKey: "duration",
        fieldName: "Thời gian thực hiện",
    },
    {
        fieldKey: "objective",
        fieldName: "Mục tiêu nghiên cứu",
    },
    {
        fieldKey: "content",
        fieldName: "Nội dung của đề tài",
    },
    {
        fieldKey: "totalCost",
        fieldName: "Kinh phí thực hiện",
    },
    {
        fieldKey: "output",
        fieldName: "Sản phẩm đề tài",
    },
    {
        fieldKey: "member",
        fieldName: "Thành viên tham gia đề tài",
    },
    {
        fieldKey: "collaboratingInstitution",
        fieldName: "Đơn vị phối hợp thực hiện đề tài",
    },
    {
        fieldKey: "implementationProgress",
        fieldName: "Tiến độ thực hiện đề tài",
    },
    {
        fieldKey: "method",
        fieldName: "Phương pháp nghiên cứu đề tài",
    }
];

const config2: IExcelColumnConfig<{ value: string, code: string, label: string, leaderName: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "ID đề tài",
    },
    {
        fieldKey: "code",
        fieldName: "Mã đề tài",
    },
    {
        fieldKey: "label",
        fieldName: "Tên đề tài",
    },
    {
        fieldKey: "leaderName",
        fieldName: "Chủ nhiệm đề tài",
    }
];


export default function AdjustRequestImportButton() {
    const academicYearStore = useAcademicYearStore();
    const authenticateStore = useAuthenticateStore();

    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMContractDetail[]) => {
            return contractDetailService.createOrUpdateList(body.map((item) => {
                return {
                    ...item,
                }
            }));
        },
        mutationType: "import",
    });

    const contractAmendmentQuery = useCustomReactQuery({
        queryKey: ['contractAmendmentQuery', academicYearStore?.state?.academicYear?.id],
        axiosFn: () => {
            return contractDetailService.GetContractAmendment({
                academicYearId: academicYearStore?.state?.academicYear?.id ?? 0
            });
        },
        options: {
            enabled: !!academicYearStore?.state?.academicYear?.id
        }
    });

    const isLeader = (contractId: number | string): boolean => {
        const sessionUserId = authenticateStore.state.userId;

        const contract = contractAmendmentQuery.data?.find(item => item.id === Number(contractId));
        if (!contract) return false;
        return contract.srmTopic?.srmTopicMembers?.some(
            member => member.srmTitle?.isLeader === true &&
                member.userId == sessionUserId
        ) || false;
    };

    const stack = useModalsStack<ModalImportId>([]);
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<SRMContractDetail>({
            workbook: workbook,
            sheetName: "Danh sách đề tài yêu cầu điều chỉnh",
            data: [],
            config: config,
        });
        await excelUtils.addSheet<{ value: string, code: string, label: string, leaderName: string }>({
            workbook: workbook,
            sheetName: "Danh sách đề tài",
            data: contractAmendmentQuery.data?.map(item => (
                {
                    value: item.id!.toString(),
                    code: item?.code || "",
                    label: item?.name || "",
                    leaderName: item?.srmTopic?.srmTopicMembers
                        ?.filter((member) => member.srmTitle?.isLeader === true)
                        .map((member) => member.user?.fullName)
                        .join(", ") || "",
                }
            )) || [],
            config: config2,
        });
        excelUtils.download({ name: "Mẫu_import_đề_tài_yêu_cầu_điều_chỉnh", workbook });
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
                onExecute={(finalValues: SRMContractDetail[]) => {
                    const nonLeaderContracts = finalValues.filter(item => !isLeader(item.srmContractId!));
                    if (nonLeaderContracts.length > 0) {
                        const nonLeaderContractIds = nonLeaderContracts.map(item => item.srmContractId);
                        const nonLeaderContractCodes = contractAmendmentQuery.data
                            ?.filter(contract => nonLeaderContractIds.includes(contract.id!))
                            .map(contract => contract.code)
                            .join(", ");

                        notifications.show({
                            title: 'Lỗi Import',
                            message: `Bạn không phải là chủ nhiệm của các đề tài sau: ${nonLeaderContractCodes || 'Unknown'}`,
                            color: 'red',
                        });
                        return;
                    }

                    finalValues = finalValues.map((item) => {
                        return {
                            ...item,
                            amendmentContent: item.amendmentContent?.toString() || "",
                            academicYearId: academicYearStore?.state?.academicYear?.id || 0,
                            duration: item.duration?.toString() || "",
                            objective: item.objective?.toString() || "",
                            content: item.content?.toString() || "",
                            totalCost: item.totalCost ? Number(item.totalCost) : 0,
                            output: item.output?.toString() || "",
                            member: item.member?.toString() || "",
                            collaboratingInstitution: item.collaboratingInstitution?.toString() || "",
                            implementationProgress: item.implementationProgress?.toString() || "",
                            method: item.method?.toString() || "",
                            processingStatus: 1,
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