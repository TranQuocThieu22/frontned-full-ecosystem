import { EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { SRMProposalList } from "@/shared/interfaces/SRMProposalList";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";

export default function ProposalListExport({ data }: { data: SRMProposalList[] }) {
  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã đề xuất" },
      { fieldName: "name", header: "Tên đề tài" },
      { fieldName: "srmAreaName", header: "Lĩnh vực" },
      { fieldName: "objective", header: "Mục tiêu" },
      { fieldName: "estimatedBudgetFormatted", header: "Tổng kinh phí dự kiến" },
      { fieldName: "requirement", header: "Yêu cầu đối với kết quả" },
      { fieldName: "srmTypeName", header: "Loại đề tài" },
      { fieldName: "result", header: "Kết quả chính" },
      { fieldName: "expectedOutput", header: "Phương án ứng dụng" },
      { fieldName: "duration", header: "Thời gian thực hiện (tháng)" },
      { fieldName: "userCode", header: "Mã viên chức đăng ký" },
      { fieldName: "userFullName", header: "Tên viên chức đăng ký" },
      { fieldName: "userWorkingUnitName", header: "Đơn vị đăng ký" },
      { fieldName: "srmConclusion", header: "Kết luận của hội đồng tư vấn" },
    ],
  };

  const values = data.map((item) => {
    return {
      ...item,
      srmAreaName: item.srmArea?.name,
      estimatedBudgetFormatted: currencyUtils.formatWithSuffix(item.estimatedBudget ?? 0, ""),
      srmTypeName: item.srmType?.name,
      proposalStatusLabel: converterUtils.getLabelByValue(EnumProposalStatusLabels, item.proposalStatus),
      userCode: item.user?.code,
      userFullName: item.user?.fullName,
      userWorkingUnitName: (item.user as any)?.workingUnitName,
      srmConclusion: item.srmConclusion?.name,
    } as any;
  });

  return (
    <AQButtonExportData objectName="Danh_sach_de_xuat" data={values || []} exportConfig={exportConfig} />
  );
}