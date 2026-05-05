"use client";

import { accountService } from "@/shared/APIs/accountService";
import { areaService } from "@/shared/APIs/areaService";
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumTaskProposalType } from "@/shared/consts/enum/EnumTaskProposalType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { notifications } from "@mantine/notifications";

const fields: FieldOption<SRMTaskProposal>[] = [
    { fieldKey: "code", fieldName: "Mã đề tài", isRequired: true },
    { fieldKey: "name", fieldName: "Tên đề tài", isRequired: true },
    { fieldKey: "srmAreaId", fieldName: "ID lĩnh vực", parseType: "number" },
    { fieldKey: "necessity", fieldName: "Tính cấp thiết", isRequired: true },
    { fieldKey: "objective", fieldName: "Mục tiêu", isRequired: true },
    { fieldKey: "result", fieldName: "Kết quả chính", isRequired: true },
    { fieldKey: "requirement", fieldName: "Yêu cầu đối với kết quả" },
    { fieldKey: "estimatedBudget", fieldName: "Tổng chi phí dự kiến", isRequired: true, parseType: "number" },
    { fieldKey: "duration", fieldName: "Thời gian thực hiện", isRequired: true },
    { fieldKey: "startDate", fieldName: "Từ tháng/năm", parseType: "date" },
    { fieldKey: "endDate", fieldName: "Đến tháng/năm", parseType: "date" },
    { fieldKey: "userId", fieldName: "ID sinh viên", isRequired: true, parseType: "number" },
    { fieldKey: "expectedOutput", fieldName: "Phương án ứng dụng", isRequired: true },
];

export default function SubmitStudentProposalImportButton() {
    const academicYearStore = useAcademicYearStore();

    return (
        <CustomButtonImport<SRMTaskProposal>
            fields={fields}
            fileName="Mẫu import đề xuất đề tài"
            onSubmit={(values) => {
                const finalValues = values ?? [];
                const codeCountMap = new Map<string, number>();
                for (const v of finalValues) {
                    const code = String((v as any)?.code ?? "").trim();
                    if (!code) continue;
                    codeCountMap.set(code, (codeCountMap.get(code) || 0) + 1);
                }
                const duplicatedCodesInFile = Array.from(codeCountMap.entries())
                    .filter(([, count]) => count > 1)
                    .map(([code]) => code);
                if (duplicatedCodesInFile.length > 0) {
                    notifications.show({
                        title: "Lỗi Import",
                        message: `Các mã đề xuất bị trùng trong file: ${duplicatedCodesInFile.join(", ")}`,
                        color: "red",
                    });
                    return false;
                }
                const mapped = finalValues.map((item) => ({
                    ...item,
                    estimatedBudget: Number(item.estimatedBudget),
                    duration: item.duration,
                    userId: Number(item.userId),
                    srmAreaId: Number(item.srmAreaId),
                    academicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
                    type: EnumTaskProposalType.StudentProposal,
                    proposalStatus: 1,
                    startDate: item.startDate ? new Date(item.startDate).toISOString().split("T")[0] : undefined,
                    endDate: item.endDate ? new Date(item.endDate).toISOString().split("T")[0] : undefined,
                }));
                return taskProposalService.createList(mapped);
            }}
        />
    );
}
