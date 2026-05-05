import { EnumContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function StaffListExport({ table }: { table: MRT_TableInstance<SRMTopicMember> }) {
  const { data } = useExportData(table)

  const exportConfig = {
    fields: [
      { fieldName: "userCode", header: "Mã viên chức" },
      { fieldName: "userFullName", header: "Họ tên" },
      { fieldName: "srmTitleName", header: "Vai trò thực hiện đề tài" },
      { fieldName: "topicCode", header: "Mã đề tài" },
      { fieldName: "topicName", header: "Tên đề tài" },
      { fieldName: "leaderName", header: "Chủ nhiệm đề tài" },
      { fieldName: "hostOrganization", header: "Đơn vị chủ nhiệm" },
      { fieldName: "managingOrganization", header: "Đơn vị quản lý" },
      { fieldName: "topicLevel", header: "Cấp đề tài" },
      { fieldName: "topicType", header: "Loại đề tài" },
      { fieldName: "totalCost", header: "Tổng kinh phí (dự đoán)" },
      { fieldName: "duration", header: "Thời gian thực hiện" },
      { fieldName: "fromDate", header: "Từ tháng/năm" },
      { fieldName: "toDate", header: "Đến tháng/năm" },
      { fieldName: "executionStatus", header: "Trạng thái thực hiện" },
      { fieldName: "srmConclusionName", header: "Kết luận của hội đồng nghiệm thu" },
    ],
  };

  const values = data.map(item => {

    return {
      userCode: item.user?.code || "",
      userFullName: item.user?.fullName || "",
      srmTitleName: item.srmTitle?.name || "",
      topicCode: item.srmTopic?.code || "",
      topicName: item.srmTopic?.registerName || "",
      leaderName: item.srmTitle?.isLeader ? item.user?.fullName : "",
      hostOrganization: item.srmTopic?.hostOrganization || "",
      managingOrganization: item.srmTopic?.managingOrganization || "",
      topicLevel: item.srmTopic?.srmType?.srmLevel?.name || "",
      topicType: item.srmTopic?.srmType?.name || "",
      totalCost: item.srmTopic?.totalCost ? currencyUtils.formatWithSuffix(item.srmTopic.totalCost) : "",
      duration: item.srmTopic?.duration || "",
      fromDate: dateUtils.toMMYYYY(item.srmTopic?.fromDate),
      toDate: dateUtils.toMMYYYY(item.srmTopic?.toDate),
      executionStatus: EnumLabelContractExecutionStatus[(item.srmTopic?.srmContract?.executionStatus ?? 1) as EnumContractExecutionStatus] || "",
      srmConclusionName: item.srmTopic?.srmEvaluationTopic?.srmConclusion?.name || "",
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách kết quả tham gia duyệt đề xuất"
      data={values || []}
      exportConfig={exportConfig}
    />
  );
}