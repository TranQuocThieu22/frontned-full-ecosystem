import { ReportStatusEnumLabel } from "@/shared/constants/enum/ReportStatusEnum";
import { TaskDetailReportStatusEnum } from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import { TrackingStatusEnumLabel } from "@/shared/constants/enum/TrackingStatusEnum";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  table: MRT_TableInstance<IRequirement>;
  loading: boolean;
}

export default function WriteJustificationExportButton({
  table,
  loading,
}: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        header: "Mã tiêu chuẩn",
        fieldName: "eaqStandardCode",
        formatFunction: (value: any, row: IRequirement) =>
          row?.eaqCriteria?.eaqStandard?.code || "",
      },
      {
        header: "Mã tiêu chí",
        fieldName: "eaqCriteriaCode",
        formatFunction: (value: any, row: IRequirement) =>
          row?.eaqCriteria?.code || "",
      },
      {
        header: "Tên tiêu chí",
        fieldName: "eaqCriteriaName",
        formatFunction: (value: any, row: IRequirement) =>
          row?.eaqCriteria?.name || "",
      },
      {
        header: "Mã yêu cầu",
        fieldName: "code",
        formatFunction: (value: any, row: IRequirement) => row?.code || "",
      },
      {
        header: "Tên yêu cầu",
        fieldName: "name",
        formatFunction: (value: any, row: IRequirement) => row?.name || "",
      },
      {
        header: "Tên đơn vị chủ trì",
        fieldName: "hostUnitName",
        formatFunction: (value: any, row: IRequirement) =>
          row?.hostUnit?.name || "",
      },
      {
        header: "Nhân sự phụ trách",
        fieldName: "userFullName",
        formatFunction: (value: any, row: IRequirement) =>
          row?.user?.fullName || "",
      },
      {
        header: "Đã nộp",
        fieldName: "submitted",
        formatFunction: (value: any, row: IRequirement) =>
          row?.reportStatus === TaskDetailReportStatusEnum.IsSubmitted
            ? "Đã nộp"
            : "Chưa nộp",
      },
      {
        header: "Trạng thái tổng hợp",
        fieldName: "reportStatus",
        formatFunction: (value: any, row: IRequirement) =>
          row?.reportStatus !== undefined
            ? ReportStatusEnumLabel[
            row.reportStatus as TaskDetailReportStatusEnum
            ] || ""
            : "",
      },
      {
        header: "Trạng thái kiểm tra",
        fieldName: "trackingStatus",
        formatFunction: (value: any, row: IRequirement) =>
          row?.trackingStatus !== undefined
            ? TrackingStatusEnumLabel[
            row.trackingStatus as keyof typeof TrackingStatusEnumLabel
            ] || ""
            : "",
      },
    ],
  };

  return (
    <AQButtonExportData
      objectName="Danh sách yêu cầu"
      data={data}
      loading={loading}
      exportConfig={exportConfig}
    />
  );
}
