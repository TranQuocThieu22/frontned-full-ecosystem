import { EnumProposalStatus, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function ScientificTaskProposalExport({ table }: { table: MRT_TableInstance<SRMTaskProposal> }) {
  const { data } = useExportData(table)

  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã đề xuất" },
      { fieldName: "name", header: "Tên đề tài" },
      { fieldName: "srmAreaName", header: "Lĩnh vực" },
      { fieldName: "objective", header: "Mục tiêu" },
      { fieldName: "estimatedBudgetFormatted", header: "Tổng chi phí dự kiến" },
      { fieldName: "expected", header: "Phương án ứng dụng" },
      { fieldName: "duration", header: "Thời gian thực hiện (tháng)" },
      { fieldName: "userCode", header: "Mã viên chức đăng ký" },
      { fieldName: "userFullName", header: "Tên viên chức đăng ký" },
      { fieldName: "registrant", header: "Đơn vị đăng ký" },
      { fieldName: "srmTypeName", header: "Loại đề tài" },
      { fieldName: "proposalStatusLabel", header: "Trạng thái đề xuất" },
    ],
  };

  const values = data.map((item) => {
    return {
      ...item,
      srmAreaName: item.srmArea?.name,
      estimatedBudgetFormatted: currencyUtils.formatWithSuffix(item.estimatedBudget ?? 0),
      userCode: item.user?.code,
      userFullName: item.user?.fullName,
      srmTypeName: item.srmType?.name,
      proposalStatusLabel: EnumProposalStatusLabels[item.proposalStatus as EnumProposalStatus],
    } as any;
  });

  return (
    <AQButtonExportData objectName="Danh_sach_de_xuat_de_tai" data={values || []} exportConfig={exportConfig} />
  );
}