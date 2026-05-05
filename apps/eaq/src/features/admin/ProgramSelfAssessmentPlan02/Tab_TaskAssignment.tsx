import { IEvaluationPlan } from "@/shared/interfaces/evaluationPlan/IEvaluationPlan";
import { IStandard } from "@/shared/interfaces/standard/Standard";
import { ITask } from "@/shared/interfaces/task/ITask";
import { Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import TaskAssignmentTabCreateOrUpdate from "./Tab_TA_CUD/TabTACreateOrUpdate";
import TaskAssignmentTabDelete from "./Tab_TA_CUD/TabTADelete";
import TaskAssignmentTabDeleteList from "./Tab_TA_CUD/TabTADeleteList";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
export default function Tab_TaskAssignment({
  form,
  standardData,
  setTaskList,
  taskList: newTaskList,
  viewOnly = false,
}: {
  form: UseFormReturnType<IEvaluationPlan>;
  standardData?: IStandard[];
  setTaskList: Dispatch<SetStateAction<ITask[]>>;
  taskList: ITask[];
  viewOnly?: boolean;
}) {
  function handleCreate({
    row,
    childForm,
    disclosure,
  }: {
    row?: MRT_Row<ITask>;
    childForm: UseFormReturnType<ITask>;
    disclosure: UseDisclosureReturnValue;
  }) {
    const newItem = childForm.getValues();
    const isValid = !childForm.validate().hasErrors;
    const isExisted = newTaskList.some(
      (x) =>
        x.eaqStandardId === newItem.eaqStandardId &&
        x.eaqCouncilGroupId === newItem.eaqCouncilGroupId &&
        x.isEnabled != false
    );

    const isStandardIdExisted = newTaskList.some(
      (x) => x.eaqStandardId === newItem.eaqStandardId && x.isEnabled != false
    );

    if (!isValid) {
      utils_notification_show({
        crudType: "error",
        message: "Vui lòng nhập đầy đủ các field yêu cầu",
      });
      return;
    }

    if (isExisted) {
      notifications.show({
        message: (
          <Text>
            Tiêu chuẩn này đã được phân công cho{" "}
            <span style={{ fontWeight: "bold", color: "red" }}>
              {newItem.eaqCouncilGroup?.name}
            </span>{" "}
            xử lí, vui lòng kiểm tra lại thông tin!
          </Text>
        ),
        color: "red",
      });

      return;
    }

    if (isStandardIdExisted) {
      notifications.show({
        message: (
          <Text>
            Tiêu chuẩn{" "}
            <span style={{ fontWeight: "bold", color: "red" }}>
              {newItem.eaqStandard?.code} - {newItem.eaqStandard?.name}
            </span>{" "}
            đã được phân công xử lí, vui lòng kiểm tra lại thông tin!
          </Text>
        ),
        color: "red",
      });
      return;
    }

    // Simply append the new item without modifying existing items
    setTaskList((prev) => [
      ...prev,
      { ...newItem, isEnabled: true, isOld: false }
    ]);

    utils_notification_show({
      crudType: "create",
      message: "Tạo thành công!",
    });

    childForm.reset();
    childForm.clearErrors();
    disclosure[1].close();
  }

  function handleUpdate({
    row, // vẫn có nhưng sẽ bị bỏ qua
    childForm,
    disclosure,
  }: {
    row?: MRT_Row<ITask>;
    childForm: UseFormReturnType<ITask>;
    disclosure: UseDisclosureReturnValue;
  }) {
    if (!row) return;

    const isValid = !childForm.validate().hasErrors;

    if (!isValid) {
      utils_notification_show({
        crudType: "error",
        message: "Vui lòng nhập đầy đủ các field yêu cầu",
      });
      return;
    }

    const updatedItem = childForm.getValues();

    const isSameStandard =
      row.original.eaqStandardId === updatedItem.eaqStandardId;

    const isExisted = newTaskList.some(
      (x) =>
        x.eaqStandardId === updatedItem.eaqStandardId &&
        x.eaqCouncilGroupId === updatedItem.eaqCouncilGroupId &&
        x.isEnabled != false &&
        x.id !== row.original.id
    );

    const isStandardIdExisted = newTaskList.some(
      (x) =>
        x.eaqStandardId === updatedItem.eaqStandardId && x.isEnabled != false
    );

    if (isExisted && !isSameStandard) {
      notifications.show({
        message: (
          <Text>
            Tiêu chuẩn này đã được phân công cho{" "}
            <span style={{ fontWeight: "bold", color: "red" }}>
              {updatedItem.eaqCouncilGroup?.name}
            </span>{" "}
            xử lí, vui lòng kiểm tra lại thông tin!
          </Text>
        ),
        color: "red",
      });
      return;
    }

    if (isStandardIdExisted && !isSameStandard) {
      notifications.show({
        message: (
          <Text>
            Tiêu chuẩn{" "}
            <span style={{ fontWeight: "bold", color: "red" }}>
              {updatedItem.eaqStandard?.code} - {updatedItem.eaqStandard?.name}
            </span>{" "}
            đã được phân công xử lí, vui lòng kiểm tra lại thông tin!
          </Text>
        ),
        color: "red",
      });
      return;
    }

    setTaskList((prev) =>
      prev.map((item, index) => {
        // For new items (no id or id = 0), match by index
        if (!row.original.id || row.original.id === 0) {
          return index === row.index
            ? { ...item, ...updatedItem, isOld: false }
            : item;
        }

        // For existing items with id, match by id
        if (item.id === row.original.id) {
          // Mark as modified (isOld: false) when updating existing data
          return {
            ...item,
            ...updatedItem,
            isOld: false  // Always set to false when modified
          };
        }

        return item;
      })
    );

    utils_notification_show({
      crudType: "update",
      message: "Cập nhật thành công!",
    });

    childForm.reset();
    childForm.clearErrors();
    disclosure[1].close();
  }

  function handleDelete(row: MRT_Row<ITask>) {
    setTaskList((prev) => {
      const target = row.original;

      // If no id (temporary data created in this session)
      if (!target.id || target.id === 0) {
        // Remove it completely from the list
        const indexToDelete = prev.findIndex(
          (x) =>
            !x.id &&
            x.eaqStandardId === target.eaqStandardId &&
            x.eaqCouncilGroupId === target.eaqCouncilGroupId
        );

        if (indexToDelete === -1) return prev;

        return [
          ...prev.slice(0, indexToDelete),
          ...prev.slice(indexToDelete + 1),
        ];
      }

      // If has id (existing data from database)
      // Mark as deleted and set isOld: false to ensure it's sent to backend
      return prev.map((task) =>
        task.id === target.id
          ? { ...task, isEnabled: false, isOld: false }
          : task
      );
    });
  }

  const columns = useMemo<MRT_ColumnDef<ITask>[]>(
    () => [
      {
        header: "Tiêu chuẩn",
        id: "standardName",
        accessorFn: (row) =>
          `${row.eaqStandard?.code ?? ""} - ${row.eaqStandard?.name ?? ""}`,
        size: 300,
      },
      {
        header: "Nhóm công tác",
        id: "workingGroupName",
        accessorFn: (row) =>
          `${row.eaqCouncilGroup?.code ?? ""} - ${row.eaqCouncilGroup?.name ?? ""}`,
        size: 300,
      },
      {
        header: "Thời gian thu thập thông tin và minh chứng (Dự kiến)",
        accessorKey: "evidenceCollectionTime",
      },
      { header: "Ghi chú", accessorKey: "note", size: 300 },
    ],
    []
  );

  return (
    <CustomDataTable
      columns={columns}
      data={newTaskList.filter((t) => t.isEnabled != false)}
      enableRowSelection={!viewOnly}
      enableColumnFilters
      enableRowNumbers
      renderTopToolbarCustomActions={({ table }) => {
        if (viewOnly) return null;
        return (
          <>
            <TaskAssignmentTabCreateOrUpdate
              onClick={handleCreate}
              assessmentCouncilDecisionId={
                form.getValues()?.eaqAssessmentCouncilDecisionId ?? null
              }
              standardData={standardData || []}
            />
            <TaskAssignmentTabDeleteList
              values={table.getSelectedRowModel().rows}
              onDeleteList={(rows: MRT_Row<ITask>[]) => {
                setTaskList((prev) => {
                  let filtered = prev.filter(
                    (_, idx) =>
                      !rows.some((row) => !row.original.id && row.index === idx)
                  );

                  filtered = filtered.map((item, idx) => {
                    const row = rows.find((r) => r.index === idx);
                    if (row && row.original.id && row.original.id > 0) {
                      return { ...item, isEnabled: false };
                    }
                    return item;
                  });

                  return filtered;
                });
                table.resetRowSelection();
              }}
            />
          </>
        );
      }}
      renderRowActions={({ row }) => {
        if (viewOnly) return null;
        return (
          <CustomCenterFull>
            <TaskAssignmentTabCreateOrUpdate
              data={row}
              onClick={handleUpdate}
              assessmentCouncilDecisionId={
                form.getValues()?.eaqAssessmentCouncilDecisionId ?? null
              }
              standardData={standardData || []}
            />
            <TaskAssignmentTabDelete
              label={row.original.eaqStandard?.code || ""}
              onDelete={() => handleDelete(row)}
            />
          </CustomCenterFull>
        );
      }}
    />
  );
}
