import { EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function SummaryOfResearchProposalsExport({ table }: { table: MRT_TableInstance<SRMTaskProposal> }) {

  const { data } = useExportData(table)

  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã đề xuất" },
      { fieldName: "name", header: "Tên đề tài" },
      { fieldName: "srmAreaName", header: "Lĩnh vực" },
      { fieldName: "objective", header: "Mục tiêu" },
      { fieldName: "estimatedBudgetFormatted", header: "Tổng kinh phí dự kiến" },
      { fieldName: "result", header: "Kết quả chính" },
      { fieldName: "expectedOutput", header: "Phương án ứng dụng" },
      { fieldName: "duration", header: "Thời gian thực hiện (tháng)" },
      { fieldName: "userCode", header: "Mã sinh viên đăng ký" },
      { fieldName: "userFullName", header: "Họ tên sinh viên đăng ký" },
      { fieldName: "facultyId", header: "Mã khoa" },
      { fieldName: "proposalStatus", header: "Trạng thái đề xuất" },
      { fieldName: "attachmentPath", header: "File phiếu đề xuất" },
    ],
  };

  const values = data.map(item => {
    return {
      ...item,
      srmAreaName: item.srmArea?.name,
      estimatedBudgetFormatted: currencyUtils.formatWithSuffix(item.estimatedBudget ?? 0, ''),
      userCode: item.user?.code,
      userFullName: item.user?.fullName,
      facultyId: item.user?.faculty?.code,
      proposalStatus: converterUtils.getLabelByValue(EnumProposalStatusLabels, item.proposalStatus),
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách tổng hợp đề xuất sinh viên NCKH"
      data={values || []}
      exportConfig={exportConfig}
    />
  );
}