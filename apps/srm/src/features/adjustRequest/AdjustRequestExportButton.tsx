import { EnumContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function AdjustRequestExportButton({ table }: { table: MRT_TableInstance<SRMContractDetail>; }) {
  const { data } = useExportData(table)
  const exportConfig = {
    fields: [
      { fieldName: "srmContract_Code", header: "Mã đề tài" },
      { fieldName: "srmContract_Name", header: "Tên đề tài" },
      {
        fieldName: "leaderName",
        header: "Chủ nhiệm đề tài",
      },
      { fieldName: "srmContract_ContractNumber", header: "Số hợp đồng" },
      { fieldName: "duration", header: "Thời gian thực hiện" },
      {
        fieldName: "srmContract_FromDate",
        header: "Từ tháng/ năm",
      },
      {
        fieldName: "srmContract_ToDate",
        header: "Đến tháng/ năm",
      },
      { fieldName: "amendmentContent", header: "Nội dung điều chỉnh" },
      { fieldName: "srmContract_ExecutionStatus", header: "Trạng thái thực hiện" },
    ],
  };
  const mapData = data.map((item) => {
    return {
      ...item,
      leaderName: item.srmContract?.srmTopic?.srmTopicMembers
        ?.filter((itm) => itm.srmTitle?.isLeader === true)
        .map((itm) => itm.user?.fullName)
        .join(", ") || "",
      srmContract_FromDate: dateUtils.toMMYYYY(item.srmContract?.fromDate),
      srmContract_ToDate: dateUtils.toMMYYYY(item.srmContract?.toDate),
      srmContract_Code: item.srmContract?.code,
      srmContract_Name: item.srmContract?.name,
      srmContract_ContractNumber: item.srmContract?.contractNumber,
      srmContract_ExecutionStatus: EnumLabelContractExecutionStatus[(item.srmContract?.executionStatus ?? 0) as EnumContractExecutionStatus] || "",
    };
  });


  return (
    <AQButtonExportData
      objectName="Danh sách đề tài yêu cầu điều chỉnh"
      data={mapData || []}
      exportConfig={exportConfig}
    />
  );
}
