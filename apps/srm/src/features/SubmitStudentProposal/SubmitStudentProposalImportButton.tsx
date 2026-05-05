"use client";

import { accountService } from "@/shared/APIs/accountService";
import { areaService } from "@/shared/APIs/areaService";
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumTaskProposalType } from "@/shared/consts/enum/EnumTaskProposalType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<SRMTaskProposal>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã đề tài",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên đề tài",
        isRequired: true,
    },
    {
        fieldKey: "srmAreaId",
        fieldName: "ID lĩnh vực",
    },
    {
        fieldKey: "necessity",
        fieldName: "Tính cấp thiết",
        isRequired: true,
    },
    {
        fieldKey: "objective",
        fieldName: "Mục tiêu",
        isRequired: true,
    },
    {
        fieldKey: "result",
        fieldName: "Kết quả chính",
        isRequired: true,
    },

    {
        fieldKey: "requirement",
        fieldName: "Yêu cầu đối với kết quả",
    },
    {
        fieldKey: "estimatedBudget",
        fieldName: "Tổng chi phí dự kiến",
        isRequired: true,
    },
    {
        fieldKey: "duration",
        fieldName: "Thời gian thực hiện",
        isRequired: true,
    },
    {
        fieldKey: "startDate",
        fieldName: "Từ tháng/năm",
    },
    {
        fieldKey: "endDate",
        fieldName: "Đến tháng/năm",
    },
    {
        fieldKey: "userId",
        fieldName: "ID sinh viên",
        isRequired: true,
    },
    {
        fieldKey: "expectedOutput",
        fieldName: "Phương án ứng dụng",
        isRequired: true,
    },
];

const researchArea: IExcelColumnConfig<{ label: string, value: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "ID lĩnh vực",
    },
    {
        fieldKey: "label",
        fieldName: "Tên lĩnh vực",
    },
];

const lecturer: IExcelColumnConfig<{ label: string, value: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "ID sinh viên",
    },
    {
        fieldKey: "label",
        fieldName: "Tên sinh viên",
    },
];

export default function SubmitStudentProposalImportButton() {
    const academicYearStore = useAcademicYearStore();

    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMTaskProposal[]) => {
            return taskProposalService.createOrUpdateList(body.map((item) => ({
                ...item,
                estimatedBudget: Number(item.estimatedBudget),
                duration: item.duration,
                userId: Number(item.userId),
                srmAreaId: Number(item.srmAreaId),
                academicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
                proposalStatus: 1,
                startDate: new Date(item.startDate || "").toISOString().split('T')[0],
                endDate: new Date(item.endDate || "").toISOString().split('T')[0],
            })));
        },
        mutationType: "import",
    });

    const stack = useModalsStack<ModalImportId>([]);

    const researchAreaQuery = useCustomReactQuery({
        queryKey: ['researchArea'],
        axiosFn: () => areaService.getAll(),
    })

    const studentQuery = useCustomReactQuery({
        queryKey: ['student'],
        axiosFn: () => accountService.getStudentList()
    })

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<SRMTaskProposal>({
            workbook: workbook,
            sheetName: "Danh sách đề xuất đề tài",
            data: [
                { startDate: new Date().toISOString().split('T')[0]?.substring(0, 7), endDate: new Date().toISOString().split('T')[0]?.substring(0, 7) },
            ],
            config: config,
        });
        await excelUtils.addSheet<{ label: string, value: string }>({
            workbook: workbook,
            sheetName: "Lĩnh vực",
            data: researchAreaQuery.data?.map((item) => ({
                value: item.id?.toString() ?? "",
                label: item.name ?? "",
            })) || [],
            config: researchArea,
        });
        await excelUtils.addSheet<{ label: string, value: string }>({
            workbook: workbook,
            sheetName: "DS Sinh viên",
            data: studentQuery.data?.map((item) => ({
                value: item.id?.toString() ?? "",
                label: item.fullName ?? "",
            })) || [],
            config: lecturer,
        });
        excelUtils.download({ name: "Mẫu import đề xuất đề tài", workbook });
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
                onExecute={(values: SRMTaskProposal[]) => {

                    // Kiểm tra trùng mã trong file import
                    const codeCountMap = new Map<string, number>();
                    for (const v of values) {
                        const code = String((v as any)?.code ?? "").trim();
                        if (!code) continue;
                        codeCountMap.set(code, (codeCountMap.get(code) || 0) + 1);
                    }
                    const duplicatedCodesInFile = Array.from(codeCountMap.entries())
                        .filter(([, count]) => count > 1)
                        .map(([code]) => code);
                    if (duplicatedCodesInFile.length > 0) {
                        notifications.show({
                            title: 'Lỗi Import',
                            message: `Các mã đề xuất bị trùng trong file: ${duplicatedCodesInFile.join(', ')}`,
                            color: 'red',
                        });
                        return;
                    }

                    const finalValues = values.map((item) => ({
                        ...item,
                        estimatedBudget: Number(item.estimatedBudget),
                        duration: item.duration,
                        userId: Number(item.userId),
                        srmAreaId: Number(item.srmAreaId),
                        academicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
                        type: EnumTaskProposalType.StudentProposal
                    }));

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
