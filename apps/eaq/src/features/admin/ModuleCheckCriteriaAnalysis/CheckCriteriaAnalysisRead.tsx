"use client";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import {
  CriteriaAssignmentStatusBadge
} from "../ModuleSelfAccessmentCriteria/AnalysisAndProcessingProof03/CriteriaAssignmentStatusBadge";
import { DisplayVerificationStatus } from "../TrackingProgressSeftAssessment/ComponentShared/DisplayVerificationStatus";
import CheckCriteriaAnalysisButtonModalCheck from "./CheckCriteriaAnalysisButtonModalCheck";
import CheckCriteriaAnalysisButtonModalViewDetail from "./CheckCriteriaAnalysisButtonModalViewDetail";
import CheckCriteriaAnalysisButtonPrintPDF from "./CheckCriteriaAnalysisButtonPrintPDF";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export enum enum_verificationStatus {
  NotReviewed = 1,
  MeetsStandard = 2,
  RequiresCorrection = 3,
}

export const enumLabel_verificationStatus: Record<
  enum_verificationStatus,
  string
> = {
  [enum_verificationStatus.NotReviewed]: "Chưa kiểm tra",
  [enum_verificationStatus.MeetsStandard]: "Đạt yêu cầu",
  [enum_verificationStatus.RequiresCorrection]: "Cần chỉnh sửa",
};

export enum Enum_status {
  NotStarted = 1, // Chưa bắt đầu
  InProgress = 2, // Đang thực hiện
  DraftDone = 3, // Đã soạn xong, chờ kiểm tra
}

// 2. Label tương ứng
export const enumLabel_Status: Record<Enum_status, string> = {
  [Enum_status.NotStarted]: "Chưa bắt đầu",
  [Enum_status.InProgress]: "Đang thực hiện",
  [Enum_status.DraftDone]: "Đã soạn xong, chờ kiểm tra",
};

export default function CheckCriteriaAnalysisRead() {
  const phaseStore = useS_Shared_Filter();
  const Query_TaskDetail_GetList = useCustomReactQuery({
    queryKey: [
      "CheckCriteriaAnalysisRead_GetEAQTaskDetailsByEAQPhaseId",
      phaseStore.state.Phase?.id,
    ],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailsByEAQPhaseId({
        eaqPhaseId: phaseStore.state.Phase?.id,
      }),
  });
  const columns = useMemo<MRT_ColumnDef<ITaskDetail>[]>(
    () => [
      {
        header: "Mã kế hoạch TDG",
        accessorKey: "eaqTask.eaqEvaluationPlan.code",
      },
      {
        header: "Chương trình đào tạo",
        accessorKey:
          "eaqTask.eaqEvaluationPlan.eaqPhase.eaqStandardSetTrainingProgram.name",
        size: 400,
      },
      {
        header: "Mã giai đoạn",
        accessorKey: "eaqTask.eaqEvaluationPlan.eaqPhase.code",
      },
      {
        header: "Nhóm công tác",
        accessorFn: (row) => {
          const code = row.eaqTask?.eaqCouncilGroup?.code;
          const name = row.eaqTask?.eaqCouncilGroup?.name;
          return `${code} - ${name}`;
        },
        size: 300,
      },
      {
        header: "Thành viên phụ trách",
        accessorKey: "user.fullName",
      },
      {
        header: "Mã Tiêu chí",
        accessorKey: "eaqCriteria.code",
      },
      {
        header: "Tên Tiêu chí",
        accessorKey: "eaqCriteria.name",
        size: 600,
      },
      {
        header: "Trạng thái phân tích",
        accessorKey: "analysisStatus",
        size: 300,
        Cell: ({ row }) => {
          return (
            <CriteriaAssignmentStatusBadge status={row.original.analysisStatus ?? -1} />
          );
        },
      },
      {
        header: "Trạng thái kiểm tra",
        accessorKey: "analysisTrackingStatus",
        size: 300,
        Cell: ({ cell }) => {
          const analysisStatusTrackingStatus = cell.getValue<enum_verificationStatus>();
          return (
            <DisplayVerificationStatus verificationStatus={analysisStatusTrackingStatus} />
          );
        },
      },
      {
        header: "Nhận xét của trưởng nhóm",
        accessorKey: "analysisReview",
        size: 600,
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách phân công tiêu chí">
      <CustomDataTable
        columns={columns}
        data={Query_TaskDetail_GetList.data ?? []}

        renderTopToolbarCustomActions={() => {
          return ""
          // return <MyButton actionType="export" />;
        }}
        renderRowActions={({ row }) => (
          <CustomFlexRow gap={3}>
            <CheckCriteriaAnalysisButtonModalViewDetail values={row.original} />
            <CheckCriteriaAnalysisButtonModalCheck values={row.original} />
            <CheckCriteriaAnalysisButtonPrintPDF values={row.original} />
          </CustomFlexRow>
        )}
      />
    </CustomFieldset>
  );
}
