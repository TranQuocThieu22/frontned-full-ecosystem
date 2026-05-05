import { MRT_TableInstance } from "mantine-react-table";
import { IReport } from "@/shared/interfaces/report/IReport";
import {
  TaskDetailReportStatusEnumLabel,
  TaskDetailReportStatusEnum,
} from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";

export default function QualityAssuranceImplementationReportExport({ table }: { table: MRT_TableInstance<IReport> }) {
  const { data } = useExportData(table);

  const exportConfig = {
    fields: [
      { fieldName: "standardCode", header: "Mã tiêu chuẩn" },
      { fieldName: "criteriaCode", header: "Mã tiêu chí" },
      { fieldName: "requirementCode", header: "Mã yêu cầu" },
      { fieldName: "requirementName", header: "Tên yêu cầu" },
      { fieldName: "taskCode", header: "Mã công việc" },
      { fieldName: "taskName", header: "Nội dung công việc" },
      { fieldName: "hostUnit", header: "Tên đơn vị chủ trì" },
      { fieldName: "assignedUser", header: "Nhân sự phụ trách" },
      { fieldName: "reportCount", header: "Số lần báo cáo" },
      { fieldName: "supportUnit", header: "Tên đơn vị phối hợp" },
      { fieldName: "order", header: "Lần báo cáo" },
      { fieldName: "reportDate", header: "Ngày hết hạn" },
      { fieldName: "reportStatus", header: "Trạng thái báo cáo" },
      { fieldName: "submitted", header: "Đã nộp" },
      { fieldName: "isReminded", header: "Đã nhắc nhở" },
      { fieldName: "result", header: "Công việc đã thực hiện" },
    ],
  };

  const values = data.map((item) => {
    const taskDetail = item.eaqTaskDetail as any;
    return {
      standardCode: taskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code || "",
      criteriaCode: taskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code || "",
      requirementCode: taskDetail?.eaqAnalysis?.eaqRequirement?.code || "",
      requirementName: taskDetail?.eaqAnalysis?.eaqRequirement?.name || "",
      taskCode: taskDetail?.code || "",
      taskName: taskDetail?.name || "",
      hostUnit: taskDetail?.hostUnit || "",
      assignedUser: taskDetail?.user?.fullName || "",
      reportCount: taskDetail?.reportCount || 0,
      supportUnit: taskDetail?.supportUnit || "",
      order: item.order || 0,
      reportDate: item.reportDate ? dateUtils.toDDMMYYYY(item.reportDate) : "",
      reportStatus:
        item.reportStatus !== undefined
          ? TaskDetailReportStatusEnumLabel[item.reportStatus as TaskDetailReportStatusEnum] || ""
          : "",
      submitted: item.reportStatus === TaskDetailReportStatusEnum.IsSubmitted ? "Có" : "Không",
      isReminded: item.isReminded ? "Có" : "Không",
      result: item.result || "",
    };
  });

  return (
    <AQButtonExportData
      objectName="Theo dõi Báo cáo thực hiện đảm bảo chất lượng"
      data={values || []}
      exportConfig={exportConfig}
    />
  );
}
