import { service_Department } from "@/shared/APIs/service__department";
import { service_EAQRequirement } from "@/shared/APIs/service_EAQRequirement";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import AssignedPersonel from "@/features/admin/AssignmentSummaryReporting/AssignedPersonel";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Flex, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUserMinus } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import AssignmentSummaryReportingDeleteList from "./AssignmentSummaryReportingDeleteList";
import AssignmentSummaryReportingExport from "./AssignmentSummaryReportingExport";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import AssignmentSummaryReportingUpdateMultiple from "@/features/admin/AssignmentSummaryReporting/AssignmentSummaryReportingUpdateMultiple";
import { UserAssignmentCell } from "@/shared/components/UserAssignmentCell";

export default function AssignmentSummaryReportingTable() {
  const [pendingChanges, setPendingChanges] = useState<Record<string, {
    userId?: string | null;
    userFullName?: string | null;
    hostUnitId?: string;
    hostUnitName?: string;
  }>>({});
  const filterStore = useS_Shared_Filter();

  const requirementQuery = useCustomReactQuery({
    queryKey: ["requirementQuery_AssignmentSummaryReportingTable", filterStore.state.Phase?.id],
    axiosFn: async () => service_EAQRequirement.GetEAQRequirementsByEAQPhaseId({
      eaqPhaseId: filterStore.state.Phase?.id
    }),
    options: {
      enabled: !!filterStore.state.Phase?.id
    }
  });

  const departmentQuery = useCustomReactQuery({
    queryKey: ['departmentList_QualityImprovement'],
    axiosFn: () => service_Department.getAll(),
  });

  const departmentList = useMemo(() => {
    return departmentQuery.data?.map(dept => ({
      value: String(dept.id),
      label: dept.name || ''
    })) || [];
  }, [departmentQuery.data]);

  const handlePersonelSelect = (rowData: IRequirement, selectedPersonel: any) => {
    const taskId = String(rowData.id);
    setPendingChanges(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        userId: selectedPersonel.id,
        userFullName: selectedPersonel.fullName
      }
    }));
  };

  const handleRemoveUser = (rowData: IRequirement) => {
    const taskId = String(rowData.id);
    setPendingChanges(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        userId: null,
        userFullName: null
      }
    }));

    notifications.show({
      title: 'Đã xóa nhân sự',
      message: `Nhân sự sẽ được xóa khỏi yêu cầu ${rowData.code}. Nhấn "Lưu" để xác nhận.`,
      color: 'orange',
      autoClose: 3000,
    });
  };

  const handleHostUnitChange = (rowData: IRequirement, value: string | null) => {
    const taskId = String(rowData.id);
    const selectedDept = departmentQuery.data?.find(dept => String(dept.id) === value);
    setPendingChanges(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        hostUnitId: value || undefined,
        hostUnitName: selectedDept?.name || undefined
      }
    }));
  };

  const processedData = useMemo(() => {
    return requirementQuery.data?.map(row => {
      const rowId = String(row.id);
      const pendingChange = pendingChanges[rowId];

      let user = row.user;
      if (pendingChange?.userId !== undefined) {
        if (pendingChange.userId === null) {
          user = undefined;
        } else {
          user = { ...row.user, id: Number(pendingChange.userId), fullName: pendingChange.userFullName || '' };
        }
      }

      if (user && 'workingUnitId' in user && (user.workingUnitId === null || user.workingUnitId === undefined)) {
        user = { ...user, workingUnitId: undefined };
      }

      return {
        ...row,
        user,
        hostUnit: pendingChange?.hostUnitId
          ? { ...row.hostUnit, id: pendingChange.hostUnitId, name: pendingChange.hostUnitName }
          : row.hostUnit
      } as IRequirement;
    }) || [];
  }, [requirementQuery.data, pendingChanges]);


  const columns = useMemo<MRT_ColumnDef<IRequirement>[]>(
    () => [
      { header: "Mã tiêu chuẩn", accessorKey: "eaqCriteria.eaqStandard.code" },
      { header: "Mã tiêu chí", accessorKey: "eaqCriteria.code" },
      { header: "Tên tiêu chí", accessorKey: "eaqCriteria.name", size: 300 },
      { header: "Mã yêu cầu", accessorKey: "code" },
      { header: "Yêu cầu", accessorKey: "name", size: 300 },
      {
        header: "Đơn vị chủ trì",
        accessorKey: 'hostUnit',
        Cell: ({ row }) => (
          <CustomCenterFull>
            <CustomSelect
              data={departmentList}
              value={row.original.hostUnit?.id ? String(row.original.hostUnit.id) : null}
              onChange={(value) => handleHostUnitChange(row.original, value)}
              placeholder="Chọn đơn vị"
              searchable
              clearable
            />
          </CustomCenterFull>
        ),
        size: 250
      },
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
      },
    ], [departmentList, pendingChanges]);

  const handleSave = async () => {
    if (Object.keys(pendingChanges).length === 0) {
      notifications.show({
        title: "Chưa có dữ liệu thay đổi",
        message: "Vui lòng kiểm tra lại dữ liệu",
        color: 'yellow'
      });
      return;
    }
    try {
      const payloads = Object.entries(pendingChanges).map(([taskDetailId, changes]) => {
        const originalData = processedData.find(row => row.id === Number(taskDetailId));
        return {
          id: Number(taskDetailId),
          // code: originalData?.code,
          // name: originalData?.name,
          hostUnitId: changes.hostUnitId
            ? Number(changes.hostUnitId)
            : Number(originalData?.hostUnit?.id),
          userId: changes.userId !== undefined
            ? (changes.userId === null ? undefined : Number(changes.userId))
            : originalData?.user?.id
              ? Number(originalData.user.id)
              : undefined,
        };
      });
      await service_EAQRequirement.AssignUsersAndHostUnits(payloads);

      setPendingChanges({});

      await requirementQuery.refetch();

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
    <CustomFieldset title="Danh sách hạn chế cần tổng hợp">
      <CustomDataTable
        initialState={{
          columnPinning: { right: ['user'] }
        }}
        columns={columns}
        data={processedData || []}
        enableRowSelection
        enableColumnFilters
        enableRowNumbers
        isLoading={requirementQuery.isLoading || departmentQuery.isLoading}
        isError={requirementQuery.isError || departmentQuery.isError}
        renderTopToolbarCustomActions={({ table }) => (
          <>
            <CustomButton
              leftSection
              color="blue"
              actionType="update"
              onClick={handleSave}
            >Lưu</CustomButton>
            <AssignmentSummaryReportingUpdateMultiple requirementQuery={requirementQuery} />
            {/* <QualityImprovementActionsImport /> */}
            <AssignmentSummaryReportingExport table={table} />
            <AssignmentSummaryReportingDeleteList table={table} />
          </>
        )}
      />
    </CustomFieldset>
  );
}
