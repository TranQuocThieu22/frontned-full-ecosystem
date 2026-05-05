"use client";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import {
  SelfAssessmentStatusEnumColor,
  SelfAssessmentStatusEnumIcon,
  SelfAssessmentStatusEnumLabel,
} from "@/shared/constants/enum/SelfAssessmentStatusEnum";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import AssignSelfAssessmentReviewerDeleteList
  from "@/features/admin/AssignSelfAssessmentReviewer/AssignSelfAssessmentReviewerDeleteList";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Flex, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUserMinus } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { DisplayVerificationStatus } from "../TrackingProgressSeftAssessment/ComponentShared/DisplayVerificationStatus";
import AssignedReviewer from "./AssignedReviewer";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { UserAssignmentCell } from "@/shared/components/UserAssignmentCell";

export default function AssignSelfAssessmentReviewerTable() {
  const standardSetStore = useS_Shared_Filter();
  const [pendingChanges, setPendingChanges] = useState<Record<string, {
    userId: string | null,
    userFullName: string | null
  }>>({});

  const AssignSelfAssessmentReviewerTable = useCustomReactQuery({
    queryKey: ["AssignSelfAssessmentReviewerTable", standardSetStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailsByEAQPhaseId({
        eaqPhaseId: standardSetStore.state.Phase?.id,
      }),
  });

  const handleReviewerSelect = (rowData: ITaskDetail, selectedReviewer: any) => {
    const taskId = String(rowData.id);
    setPendingChanges(prev => ({
      ...prev,
      [taskId]: {
        userId: selectedReviewer.id,
        userFullName: selectedReviewer.fullName
      }
    }));
  };

  const handleRemoveReviewer = (rowData: ITaskDetail) => {
    const taskId = String(rowData.id);
    setPendingChanges(prev => ({
      ...prev,
      [taskId]: {
        userId: null,
        userFullName: null
      }
    }));

    notifications.show({
      title: 'Đã xóa thành viên',
      message: `Thành viên sẽ được xóa khỏi tiêu chí ${rowData.eaqCriteria?.code}. Nhấn "Lưu" để xác nhận.`,
      color: 'orange',
      autoClose: 3000,
    });
  };

  const processedData = useMemo(() => {
    return AssignSelfAssessmentReviewerTable.data?.map(row => {
      const rowId = String(row.id);
      const pendingReviewer = pendingChanges[rowId];

      let reviewer = row.reviewer;
      if (pendingReviewer !== undefined) {
        if (pendingReviewer.userId === null) {
          reviewer = undefined;
        } else {
          reviewer = { ...row.reviewer, id: Number(pendingReviewer.userId), fullName: pendingReviewer.userFullName || '' };
        }
      }

      return {
        ...row,
        reviewer
      } as ITaskDetail;
    }) || [];
  }, [AssignSelfAssessmentReviewerTable.data, pendingChanges]);

  const columns = useMemo<MRT_ColumnDef<ITaskDetail>[]>(
    () => [
      {
        header: "Mã Kế hoạch TĐG",
        accessorKey: "eaqTask.eaqEvaluationPlan.code",
      },
      {
        header: "Chương trình đào tạo",
        accessorKey: "eaqTask.eaqEvaluationPlan.eaqPhase.eaqStandardSetTrainingProgram.name",
        size: 250,
      },
      {
        header: "Mã giai đoạn",
        accessorKey: "eaqTask.eaqEvaluationPlan.eaqPhase.code",
      },
      { header: "Mã Tiêu chuẩn", accessorKey: "eaqCriteria.eaqStandard.code" },
      { header: "Mã tiêu chí", accessorKey: "eaqCriteria.code" },
      { header: "Tên tiêu chí", accessorKey: "eaqCriteria.name", size: 600 },
      {
        header: "Nhóm công tác chuyên trách",
        accessorKey: "eaqTask.eaqCouncilGroup.code",
      },
      {
        header: "Thành viên phụ trách",
        accessorKey: 'user',
        accessorFn: (row) => row.user?.fullName
      },
      {
        header: "Chuyên gia nhận xét",
        accessorKey: 'reviewer',
        Cell: ({ row }) => {
          const rowId = String(row.original.id);
          const isRemoved = pendingChanges[rowId]?.userId === null;

          return (<UserAssignmentCell
            selectTooltipLabel="Danh sách chuyên gia nhận xét"
            removeTooltipLabel="Xóa chuyên gia nhận xét"
            fieldsetTitle="Danh sách chuyên gia nhận xét"
            modalTitle="Chọn chuyên gia nhận xét"
            item={row.original}
            getUser={(item) => item.reviewer}
            getId={(item) => item.id || 0}
            getItemCode={(item) => item.code || ""}
            pendingChanges={pendingChanges}
            onUserSelect={handleReviewerSelect}
            onUserRemove={handleRemoveReviewer}
          />)
        },
        size: 350
      },
      {
        header: "Tự đánh giá",
        size: 240,
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
        header: "Trạng thái kiểm tra",
        accessorKey: "selfAssessmentTrackingStatus",
        size: 240,
        accessorFn: (row) => {
          return (
            <DisplayVerificationStatus
              verificationStatus={row.selfAssessmentTrackingStatus}
            />
          );
        },
      },
    ],
    [pendingChanges]
  );

  const handleSave = async () => {
    // Check if there are any pending changes
    if (Object.keys(pendingChanges).length === 0) {
      notifications.show({
        title: "Chưa có dữ liệu thay đổi",
        message: "Vui lòng kiểm tra lại dữ liệu",
        color: 'yellow'
      });
      return;
    }

    try {
      const updateList = Object.entries(pendingChanges).map(([taskDetailId, reviewerData]) => ({
        id: Number(taskDetailId),
        reviewerId: reviewerData.userId !== null ? Number(reviewerData.userId) : undefined,
      }));
      // Execute batch update with list
      await service_EAQSelfAssessment.assignReviewersEAQSelfAssessment(updateList);
      // Clear pending changes
      setPendingChanges({});

      // Refetch the menuData to get updated values
      await AssignSelfAssessmentReviewerTable.refetch();

      notifications.show({
        title: 'Lưu thành công',
        message: 'Dữ liệu đã được lưu thành công!',
        color: 'green'
      });
    } catch (error) {
      console.error("Error saving menuData:", error);
      notifications.show({
        title: 'Lưu thất bại',
        message: 'Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại!',
        color: 'red'
      });
    }
  };

  return (
    <CustomFieldset title={`Danh sách tiêu chí`}>
      <CustomDataTable
        initialState={{
          columnPinning: { right: ['reviewer'] }
        }}
        data={processedData || []}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        isLoading={AssignSelfAssessmentReviewerTable.isLoading}
        isError={AssignSelfAssessmentReviewerTable.isError}
        renderTopToolbarCustomActions={({ table }) => (
          <>
            <CustomButton
              leftSection
              color="blue"
              actionType="update"
              onClick={handleSave}
            >Lưu</CustomButton>
            <AssignSelfAssessmentReviewerDeleteList table={table} />
          </>
        )}
      />
    </CustomFieldset>
  );
}
