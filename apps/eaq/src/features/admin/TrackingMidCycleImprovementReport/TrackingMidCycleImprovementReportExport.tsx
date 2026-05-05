import { MRT_TableInstance } from "mantine-react-table";
import { ReportStatusEnumLabel } from "@/shared/constants/enum/ReportStatusEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { EnumTaskDetailReportStatus } from "../ModulePeriodicImprovementReport/enum_taskDetailReportStatus";
import { TrackingStatusEnumLabel } from "@/shared/constants/enum/TrackingStatusEnum";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";

export default function TrackingMidCycleImprovementReportExport({
  table,
}: {
  table: MRT_TableInstance<ILimitation>;
}) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      { fieldName: "standardCode", header: "Mã tiêu chuẩn" },
      { fieldName: "criteriaCode", header: "Mã tiêu chí" },
      {
        fieldName: "criteriaName",
        header: "Tên tiêu chí",
      },
      { fieldName: "code", header: "Mã hạn chế" },
      { fieldName: "name", header: "Hạn chế" },
      {
        fieldName: "hostUnitName",
        header: "Đơn vị chủ trì",
      },
      {
        fieldName: "personInCharge",
        header: "Nhân sự phụ trách",
      },
      { fieldName: "submitted", header: "Đã nộp" },
      {
        fieldName: "reportStatus",
        header: "Trạng thái tổng hợp",
      },
      {
        fieldName: "trackingStatus",
        header: "Trạng thái kiểm tra",
      },
    ],
  };
  const mapData = data.map((item) => {
    return {
      ...item,
      standardCode: item.eaqCriteria?.eaqStandard?.code || "",
      criteriaCode: item.eaqCriteria?.code || "",
      criteriaName: item.eaqCriteria?.name || "",
      personInCharge: item.user?.fullName || "",
      hostUnitName: item.hostUnit?.name || "",
      submitted:
        item.reportStatus === EnumTaskDetailReportStatus.IsSubmitted ? "Có" : "Không",
      reportStatus: converterUtils.getLabelByValue(ReportStatusEnumLabel, item.reportStatus),
      trackingStatus: converterUtils.getLabelByValue(TrackingStatusEnumLabel, item.trackingStatus),
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách Báo cáo kết quả cải tiến chất lượng giữa chu kỳ"
      data={mapData || []}
      exportConfig={exportConfig}
    />
  );
}
