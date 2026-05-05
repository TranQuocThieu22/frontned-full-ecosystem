import { SRMContract } from "@/shared/interfaces/SRMContract";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function CostListExport({ table }: { table: MRT_TableInstance<SRMContract> }) {
  const { data } = useExportData(table)
  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã đề tài" },
      { fieldName: "name", header: "Tên đề tài" },
      { fieldName: "leaderName", header: "Chủ nhiệm đề tài" },
      { fieldName: "hostOrganization", header: "Đơn vị chủ nhiệm" },
      { fieldName: "managingOrganization", header: "Đơn vị quản lý" },
      { fieldName: "levelName", header: "Cấp đề tài" },
      { fieldName: "typeName", header: "Loại đề tài" },
      { fieldName: "totalCost", header: "Tổng kinh phí (dự đoán)" },
      { fieldName: "centralBudget", header: "Kinh phí TW (dự đoán)" },
      { fieldName: "provincialBudget", header: "Kinh phí Tỉnh (dự đoán)" },
      { fieldName: "universityBudget", header: "Kinh phí Trường (dự đoán)" },
      { fieldName: "otherBudget", header: "Kinh phí khác (dự đoán)" },
      { fieldName: "usedTotalCost", header: "Tổng kinh phí (thanh toán)" },
      { fieldName: "usedCentralBudget", header: "Kinh phí TW (thanh toán)" },
      { fieldName: "usedProvincialBudget", header: "Kinh phí Tỉnh (thanh toán)" },
      { fieldName: "usedUniversityBudget", header: "Kinh phí Trường (thanh toán)" },
      { fieldName: "usedOtherBudget", header: "Kinh phí khác (thanh toán)" },
    ],
  };

  const values = data.map(item => {
    // Tìm chủ nhiệm đề tài
    const leader = item.srmTopic?.srmTopicMembers?.find(
      (member: any) => member.srmTitle?.isLeader
    );

    return {
      code: item.code || "",
      name: item.name || "",
      leaderName: leader?.user?.fullName || "",
      hostOrganization: item.srmTopic?.hostOrganization || "",
      managingOrganization: item.srmTopic?.managingOrganization || "",
      levelName: item.srmType?.srmLevel?.name || "",
      typeName: item.srmType?.name || "",
      totalCost: currencyUtils.formatWithSuffix(item.totalCost || 0),
      centralBudget: currencyUtils.formatWithSuffix(item.centralBudget || 0),
      provincialBudget: currencyUtils.formatWithSuffix(item.provincialBudget || 0),
      universityBudget: currencyUtils.formatWithSuffix(item.universityBudget || 0),
      otherBudget: currencyUtils.formatWithSuffix(item.otherBudget || 0),
      usedTotalCost: currencyUtils.formatWithSuffix(item.usedTotalCost || 0),
      usedCentralBudget: currencyUtils.formatWithSuffix(item.usedCentralBudget || 0),
      usedProvincialBudget: currencyUtils.formatWithSuffix(item.usedProvincialBudget || 0),
      usedUniversityBudget: currencyUtils.formatWithSuffix(item.usedUniversityBudget || 0),
      usedOtherBudget: currencyUtils.formatWithSuffix(item.usedOtherBudget || 0),
    }
  })

  return (
    <AQButtonExportData
      objectName="Danh sách kết quả duyệt đề xuất"
      data={values || []}
      exportConfig={exportConfig}
    />
  );
}