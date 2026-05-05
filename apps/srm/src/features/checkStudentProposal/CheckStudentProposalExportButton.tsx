import { EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function CheckStudentProposalExportButton({ table }: { table: MRT_TableInstance<SRMTaskProposal>; }) {
    const { data } = useExportData(table)
    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã đề xuất" },
            { fieldName: "name", header: "Tên đề tài" },
            { fieldName: "srmAreaName", header: "Lĩnh vực" },
            { fieldName: "necessity", header: "Tính cấp thiết" },
            { fieldName: "objective", header: "Mục tiêu" },
            { fieldName: "estimatedBudgetFormatted", header: "Tổng kinh phí dự kiến" },
            { fieldName: "requirement", header: "Yêu cầu đối với kết quả" },
            { fieldName: "result", header: "Kết quả chính" },
            { fieldName: "expectedOutput", header: "Phương án ứng dụng" },
            { fieldName: "duration", header: "Thời gian thực hiện (tháng)" },
            { fieldName: "userCode", header: "Mã sinh viên đăng ký" },
            { fieldName: "userFullName", header: "Họ tên sinh viên đăng ký" },
            { fieldName: "userFacultyName", header: "Mã khoa" },
            { fieldName: "preliminaryReview", header: "Nhận xét kiểm tra sơ bộ" },
            { fieldName: "preliminaryIsSentMail", header: "Đã gửi thông báo" },
            { fieldName: "proposalStatusLabel", header: "Trạng thái đề xuất" },
        ],
    };

    const values = data.map((item) => {
        return {
            ...item,
            srmAreaName: item.srmArea?.name,
            estimatedBudgetFormatted: item.estimatedBudget?.toLocaleString('vi-VN'),
            userCode: item.user?.code,
            userFullName: item.user?.fullName,
            userFacultyName: "", //BE nói tạm để trống
            proposalStatusLabel: converterUtils.getLabelByValue(EnumProposalStatusLabels, item.proposalStatus),
            preliminaryIsSentMail: item.preliminaryIsSentMail ? "Có" : "Không",
        };
    });

    return (
        <AQButtonExportData objectName="Danh sách đề xuất" data={values || []} exportConfig={exportConfig} />
    );
}