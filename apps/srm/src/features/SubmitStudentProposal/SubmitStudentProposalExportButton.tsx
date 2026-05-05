import { EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function SubmitStudentProposalExportButton({ table, loading }: { table: MRT_TableInstance<SRMTaskProposal>, loading: boolean }) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã đề xuất"
            },
            {
                fieldName: "name",
                header: "Tên đề tài"
            },
            {
                fieldName: "attachmentPath",
                header: "File Phiếu đề xuất"
            },
            {
                fieldName: "srmArea.name",
                header: "Lĩnh vực",
                formatFunction: (row: SRMTaskProposal, object: SRMTaskProposal) => {
                    return object.srmArea?.name
                }
            },
            {
                fieldName: "necessity",
                header: "Tính cấp thiết"
            },
            {
                fieldName: "objective",
                header: "Mục tiêu"
            },
            {
                fieldName: "estimatedBudget",
                header: "Tổng chi phí dự kiến"
            },
            {
                fieldName: "requirement",
                header: "Yêu cầu đối với kết quả"
            },
            {
                fieldName: "result",
                header: "Kết quả chính"
            },
            {
                fieldName: "expectedOutput",
                header: "Phương án ứng dụng"
            },
            {
                fieldName: "duration",
                header: "Thời gian thực hiện (tháng)"
            },
            {
                fieldName: "user.code",
                header: "Mã sinh viên đăng ký",
                formatFunction: (row: SRMTaskProposal, object: SRMTaskProposal) => {
                    return object.user?.code
                }
            },
            {
                fieldName: "user.fullName",
                header: "Tên sinh viên đăng ký",
                formatFunction: (row: SRMTaskProposal, object: SRMTaskProposal) => {
                    return object.user?.fullName
                }
            },
            {
                fieldName: "user.facultyCode",
                header: "Mã khoa",
            },
            {
                fieldName: "proposalStatus",
                header: "Trạng thái đề xuất",
                formatFunction: (row: SRMTaskProposal, object: SRMTaskProposal) => {
                    return converterUtils.getLabelByValue(EnumProposalStatusLabels, object.proposalStatus)
                }
            },
        ],
    };

    const values = data.map(item => {
        return {
            ...item,
        }
    })

    return (
        <AQButtonExportData
            objectName="Nộp đề xuất nhiệm vụ khoa học"
            data={values || []}
            loading={loading}
            exportConfig={exportConfig}
        />
    );
}