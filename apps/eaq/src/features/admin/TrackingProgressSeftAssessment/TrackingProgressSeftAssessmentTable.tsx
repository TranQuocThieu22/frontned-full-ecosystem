"use client";
import {
  SelfAssessmentStatusEnumColor,
  SelfAssessmentStatusEnumIcon,
  SelfAssessmentStatusEnumLabel
} from "@/shared/constants/enum/SelfAssessmentStatusEnum";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Center, Checkbox, Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayVerificationStatus } from "./ComponentShared/DisplayVerificationStatus";
import NotificationDetailButton from "./NotificationMail/NotificationDetailButton";
import SendNotificationButton from "./NotificationMail/SendNotificationButton";
import SelfAssessmentViewDetail from "./SelfAssessmentViewDetail";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function TrackingProgressSeftAssessmentTable() {
  const standardSetStore = useS_Shared_Filter();

  const taskDetailListQuery = useCustomReactQuery({
    queryKey: ["Task_Detail_List", standardSetStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailsByEAQPhaseId({
        eaqPhaseId: standardSetStore.state.Phase?.id,
      }),
  });

  const columns = useMemo<MRT_ColumnDef<ITaskDetail>[]>(
    () => [
      {
        header: "Mã Kế hoạch TDG",
        accessorFn: (row) => row.eaqTask?.eaqEvaluationPlan?.code ?? "",
      },
      {
        header: "Mã CTDT",
        accessorFn: (row) => row.eaqTask?.eaqEvaluationPlan?.eaqPhase?.eaqStandardSetTrainingProgram?.code ?? "",
      },
      {
        header: "Mã giai đoạn",
        accessorFn: (row) => row.eaqTask?.eaqEvaluationPlan?.eaqPhase?.code ?? "",
      },
      {
        header: "Mã tiêu chuẩn",
        accessorFn: (row) => row.eaqCriteria?.eaqStandard?.code ?? "",
      },
      {
        header: "Mã tiêu chí",
        accessorFn: (row) => row.eaqCriteria?.code ?? "",
      },
      {
        header: "Tên tiêu chí",
        accessorFn: (row) => row.eaqCriteria?.name ?? "",
        size: 500,
      },
      {
        header: "Nhóm công tác chuyên trách",
        accessorFn: (row) => row.eaqTask?.eaqCouncilGroup?.code ?? "",
      },
      {
        header: "Thành viên phụ trách",
        accessorFn: (row) => row.user?.fullName ?? "",
      },
      {
        header: "Ngày bắt đầu",
        accessorKey: "startDate",
        Cell: ({ row }) => dateUtils.toDDMMYYYY(row.original.startDate)
      },
      {
        header: "Ngày kết thúc",
        accessorKey: "endDate",
        Cell: ({ row }) => dateUtils.toDDMMYYYY(row.original.endDate)
      },
      {
        header: "Tự đánh giá",
        size: 300,
        accessorFn: (row) => (
          <CustomEnumBadge
            value={row.selfAssessmentStatus}
            enumLabel={SelfAssessmentStatusEnumLabel}
            enumColor={SelfAssessmentStatusEnumColor}
            enumIcon={SelfAssessmentStatusEnumIcon}
          />
        ),
      },
      {
        header: "Chi tiết tự đánh giá",
        Cell: ({ row }) => <SelfAssessmentViewDetail
          trainingProgramId={row.original.eaqTask?.eaqEvaluationPlan?.eaqTrainingProgram?.id}
          taskDetailId={row.original.id}
          phaseId={row.original.eaqTask?.eaqEvaluationPlan?.eaqPhaseId}
        />
      },
      {
        header: "Trạng thái kiểm tra",
        accessorKey: "selfAssessmentTrackingStatus",
        size: 300,
        Cell: ({ row }) => <DisplayVerificationStatus verificationStatus={row.original.selfAssessmentTrackingStatus} />
      },
      {
        header: "Đã gửi thông báo",
        accessorKey: "isSendMail",
        Cell: ({ row }) => <Center><Checkbox checked={row.original.isSendMail} readOnly /></Center>
      },
      {
        header: "Số lần gửi",
        accessorKey: "mailSentCount"
      },
      {
        header: "Nội dung thông báo",
        Cell: ({ row }) => <NotificationDetailButton taskDetailId={row.original.id} />
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách tiêu chí">
      <CustomDataTable
        isLoading={taskDetailListQuery.isLoading}
        isError={taskDetailListQuery.isError}
        data={taskDetailListQuery.data || []}
        enableRowSelection
        enableRowNumbers
        columns={columns}
        enableRowActions
        renderRowActions={({ row }) => (
          <Center>
            <SendNotificationButton taskDetailId={row.original.id || 0} />
          </Center>
        )}
      />
    </CustomFieldset>
  );
}
