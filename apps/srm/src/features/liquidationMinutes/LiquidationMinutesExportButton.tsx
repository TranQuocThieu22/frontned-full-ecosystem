import { SRMLiquidationMinute } from "@/shared/interfaces/SRMLiquidationMinute";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function LiquidationMinutesExportButton({ table }: { table: MRT_TableInstance<SRMLiquidationMinute>; }) {
  const { data } = useExportData(table)
  const exportConfig = {
    fields: [
      { fieldName: "minuteNumber", header: "Số biên bản" },
      { fieldName: "liquidationDate", header: "Ngày biên bản" },
      { fieldName: "srmContract_Code", header: "Mã đề tài" },
      { fieldName: "srmContract_Name", header: "Tên đề tài" },
      { fieldName: "leaderName", header: "Chủ nhiệm đề tài" },
      { fieldName: "srmContract_Duration", header: "Thời gian thực hiện" },
      { fieldName: "srmContract_FromDate", header: "Từ tháng/ năm" },
      { fieldName: "srmContract_ToDate", header: "Đến tháng/ năm" },
      { fieldName: "srmContract_TotalCost", header: "Kinh phí dự đoán" },
      { fieldName: "proposedBudget", header: "Kinh phí đề nghị" },
      { fieldName: "totalCost", header: "Kinh phí thanh toán" },
      { fieldName: "refundedBudget", header: "Kinh phí hoàn trả" },
    ],
  };

  const mapData = data.map((item) => {
    return {
      ...item,
      minuteNumber: item.minuteNumber,
      liquidationDate: dateUtils.toDDMMYYYY(item.liquidationDate),
      srmContract_Code: item.srmContract?.code,
      srmContract_Name: item.srmContract?.srmTopic?.registerName,
      leaderName: item.srmContract?.srmTopic?.srmTopicMembers
        ?.filter((itm) => itm.srmTitle?.isLeader === true)
        .map((itm) => itm.user?.fullName)
        .join(", ") || "",
      srmContract_Duration: item.srmContract?.duration,
      srmContract_FromDate: dateUtils.toMMYYYY(item.srmContract?.fromDate),
      srmContract_ToDate: dateUtils.toMMYYYY(item.srmContract?.toDate),
      srmContract_TotalCost: currencyUtils.formatWithSuffix(item.srmContract?.totalCost || 0, ' VNĐ'),
      proposedBudget: currencyUtils.formatWithSuffix(item.proposedBudget || 0, ' VNĐ'),
      totalCost: currencyUtils.formatWithSuffix(item.totalCost || 0, ' VNĐ'),
      refundedBudget: currencyUtils.formatWithSuffix(item.refundedBudget || 0, ' VNĐ'),
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách biên bản thanh lý đề tài"
      data={mapData || []}
      exportConfig={exportConfig}
    />
  );
}
