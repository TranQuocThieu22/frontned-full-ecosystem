import { ReportStatusEnumLabel, ReportStatusEnum, } from "@/shared/constants/enum/ReportStatusEnum";
import { TrackingStatusEnumLabel } from "@/shared/constants/enum/TrackingStatusEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";

export default function SummaryMidCycleImprovementResultsExport({
  table,
}: {
  table: MRT_TableInstance<ILimitation>;
}) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        fieldName: "eaqCriteria.eaqStandard.code",
        header: "Mã tiêu chuẩn",
        formatFunction: (value: any, row: ILimitation) =>
          row.eaqCriteria?.eaqStandard?.code,
      },
      {
        fieldName: "eaqCriteria.code",
        header: "Mã tiêu chí",
        formatFunction: (value: any, row: ILimitation) => row.eaqCriteria?.code,
      },
      {
        fieldName: "eaqCriteria.name",
        header: "Tên tiêu chí",
        formatFunction: (value: any, row: ILimitation) => row.eaqCriteria?.name,
      },
      {
        fieldName: "code",
        header: "Mã hạn chế",
        formatFunction: (value: any, row: ILimitation) => row.code,
      },
      {
        fieldName: "name",
        header: "Hạn chế",
        formatFunction: (value: any, row: ILimitation) => row.name,
      },
      {
        fieldName: "hostUnit.name",
        header: "Đơn vị chủ trì",
        formatFunction: (value: any, row: ILimitation) => row.hostUnit?.name,
      },
      {
        fieldName: "user.fullName",
        header: "Nhân sự phụ trách",
        formatFunction: (value: any, row: ILimitation) => row.user?.fullName,
      },
      {
        fieldName: "submitted",
        header: "Đã nộp",
        formatFunction: (value: any, row: ILimitation) =>
          row?.reportStatus === ReportStatusEnum.submitted ? "Đã nộp" : "",
      },
      {
        fieldName: "reportStatus",
        header: "Trạng thái tổng hợp",
        formatFunction: (value: any, row: ILimitation) =>
          converterUtils.getLabelByValue(
            ReportStatusEnumLabel,
            row.reportStatus
          ),
      },
      {
        fieldName: "trackingStatus",
        header: "Trạng thái kiểm tra",
        formatFunction: (value: any, row: ILimitation) =>
          converterUtils.getLabelByValue(
            TrackingStatusEnumLabel,
            row.trackingStatus
          ),
      },
    ],
  };
  const mapData = data.map((item) => {
    return {
      ...item,
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách bái cáo cải tiến giữa chu kỳ"
      data={mapData || []}
      exportConfig={exportConfig}
    />
  );
}
