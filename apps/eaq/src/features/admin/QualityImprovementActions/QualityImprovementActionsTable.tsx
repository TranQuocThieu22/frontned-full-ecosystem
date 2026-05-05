import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Flex, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUserMinus } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import AssignedPersonel from "./AssignedPersonel";
import QualityActionsButtonDeleteList from "./QualityImprovementActionsDeleteList";
import QualityImprovementActionsExport from "./QualityImprovementActionsExport";
import QualityImprovementActionsUpdateMultiple from './QualityImprovementActionsUpdateMultiple';
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { UserAssignmentCell } from "@/shared/components/UserAssignmentCell";

export default function QualityImprovementActionsTable() {
  const [pendingChanges, setPendingChanges] = useState<Record<string, {
    userId: string | undefined,
    userFullName: string | undefined
  }>>({});
  const filterStore = useS_Shared_Filter();

  const taskDetailQuery = useCustomReactQuery({
    queryKey: ["taskDetailQuery_QualityImprovementActionsTable", filterStore.state.Phase?.id],
    axiosFn: async () => service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
      eaqPhaseId: filterStore.state.Phase?.id || 0,
      analysisType: analysisTypeEnum.Limitation
    }),
    options: {
      enabled: !!filterStore.state.Phase?.id
    }
  });

  const handlePersonelSelect = (rowData: ITaskDetail, selectedPersonel: Account) => {
    const taskId = String(rowData.id);
    setPendingChanges(prev => ({
      ...prev,
      [taskId]: {
        userId: String(selectedPersonel.id),
        userFullName: selectedPersonel.fullName
      }
    }));
  };

  const handleRemoveUser = (rowData: ITaskDetail) => {
    const taskId = String(rowData.id);
    setPendingChanges(prev => ({
      ...prev,
      [taskId]: {
        userId: undefined,
        userFullName: undefined
      }
    }));

    notifications.show({
      title: 'Đã xóa nhân sự',
      message: `Nhân sự sẽ được xóa khỏi công việc ${rowData.code}. Nhấn "Lưu" để xác nhận.`,
      color: 'orange',
      autoClose: 3000,
    });
  };

  const processedData = useMemo(() => {
    return taskDetailQuery.data?.map(row => {
      const rowId = String(row.id);
      const pendingUser = pendingChanges[rowId];

      let user = row.user;
      if (pendingUser !== undefined) {
        if (pendingUser.userId === null) {
          user = undefined;
        } else {
          user = { ...row.user, id: Number(pendingUser.userId), fullName: pendingUser.userFullName || '' };
        }
      }

      return {
        ...row,
        user
      } as ITaskDetail & { taskDetailEvidenceCodes: string; taskDetailEvidenceNames: string };
    }) || [];
  }, [taskDetailQuery.data, pendingChanges]);


  const columns = useMemo<CustomColumnDef<ITaskDetail>[]>(
    () => [
      { header: "Mã tiêu chuẩn", accessorKey: "eaqAnalysis.eaqLimitation.eaqCriteria.eaqStandard.code" },
      { header: "Mã tiêu chí", accessorKey: "eaqAnalysis.eaqLimitation.eaqCriteria.code" },
      { header: "Mã hạn chế", accessorKey: "eaqAnalysis.eaqLimitation.code" },
      { header: "Tên hạn chế", accessorKey: "eaqAnalysis.eaqLimitation.name", size: columnSizeObject.name },
      { header: "Mã công việc", accessorKey: "code" },
      { header: "Tên công việc", accessorKey: "name", size: columnSizeObject.name },
      {
        header: "Minh chứng dự kiến",
        accessorKey: "taskDetailEvidenceCodes",
        accessorFn: (row) => row.eaqTaskDetailEvidences?.map(item => `${item.code} - ${item.name}`),
        type: 'list',
        size: 500
      },
      // { header: "Tên minh chứng dự kiến", accessorKey: "taskDetailEvidenceNames", size: 250 },
      { header: "Đơn vị chủ trì", accessorKey: "hostUnit.name" },
      { header: "Đơn vị phối hợp", accessorKey: "supportUnit", size: 200 },
      {
        header: "Nhân sự phụ trách",
        accessorKey: 'user',
        Cell: ({ row }) => {
          return (<UserAssignmentCell
            item={row.original}
            getUser={(item) => item.user}
            getId={(item) => item.id || 0}
            getItemCode={(item) => item.code || ""}
            pendingChanges={pendingChanges}
            onUserSelect={handlePersonelSelect}
            onUserRemove={handleRemoveUser}
          />)
        },
        size: 350
      }
    ], [pendingChanges]);

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
      // Prepare menuData for API call
      const updatePromises = Object.entries(pendingChanges).map(([taskDetailId, userData]) => {
        // Find the original row menuData
        const originalData = processedData.find(row => row.id === Number(taskDetailId));

        return service_EAQAnalysis.updateEAQTaskDetailAnalysis({
          id: Number(taskDetailId),
          code: originalData?.code,
          name: originalData?.name,
          duration: originalData?.duration,
          expectedResult: originalData?.expectedResult,
          hostUnitId: Number(originalData?.hostUnit?.id),
          supportUnit: originalData?.supportUnit,
          userId: userData.userId !== null ? Number(userData.userId) : undefined,
          note: originalData?.note,
        });
      });
      // Execute all updates
      await Promise.all(updatePromises);

      // Clear pending changes
      setPendingChanges({});

      // Refetch the menuData to get updated values
      await taskDetailQuery.refetch();

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
    <CustomFieldset title="Danh sách hạn chế cần cải tiến">
      <CustomDataTable
        initialState={{
          columnPinning: { right: ['user'] }
        }}
        columns={columns}
        data={processedData || []}
        enableRowSelection
        enableColumnFilters
        enableRowNumbers
        isLoading={taskDetailQuery.isLoading}
        isError={taskDetailQuery.isError}
        renderTopToolbarCustomActions={({ table }) => (
          <>
            <CustomButton
              leftSection
              color="blue"
              actionType="update"
              onClick={handleSave}
            >Lưu</CustomButton>
            <QualityImprovementActionsUpdateMultiple />
            <QualityImprovementActionsExport table={table} />
            <QualityActionsButtonDeleteList table={table} />
          </>
        )}
      />
    </CustomFieldset>
  );
}
