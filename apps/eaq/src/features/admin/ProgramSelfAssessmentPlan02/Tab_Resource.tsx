import { IResource } from "@/shared/interfaces/resource/IResource";
import { IStandard } from "@/shared/interfaces/standard/Standard";
import { UseFormReturnType } from "@mantine/form";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import ResourceTabCreateOrUpdate from "./Tab_SM_CUD/TabSMCreateOrUpdate";
import ResourceMobilizationTabDelete from "./Tab_SM_CUD/TabSMDelete";
import ResourceMobilizationTabDeleteList from "./Tab_SM_CUD/TabSMDeleteList";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

// Add tracking type
type IResourceWithTracking = IResource & {
  isOld?: boolean;
};

export default function Tab_Resource({
  resourceList,
  setResourceList,
  standardData,
  viewOnly = false,
}: {
  standardData?: IStandard[];
  resourceList: IResourceWithTracking[];
  setResourceList: Dispatch<SetStateAction<IResourceWithTracking[]>>;
  viewOnly?: boolean;
}) {
  const columns = useMemo<MRT_ColumnDef<IResource>[]>(
    () => [
      {
        header: "Tiêu chuẩn",
        id: "standardName",
        accessorFn: (row) =>
          `${row.eaqStandard?.code ?? ""} - ${row.eaqStandard?.name ?? ""}`,
      },
      { header: "Hoạt động", accessorKey: "activity", size: 300 },
      {
        header: "Các nguồn lực cần huy động",
        accessorKey: "resourcesToMobilize",
        size: 300,
      },
      { header: "Thời điểm cần huy động", accessorKey: "mobilizationTime" },
      { header: "Ghi chú", accessorKey: "note", size: 300 },
    ],
    []
  );

  function handleCreate({
    row,
    childForm,
    disclosure,
  }: {
    row?: MRT_Row<IResource>;
    childForm: UseFormReturnType<IResource>;
    disclosure: UseDisclosureReturnValue;
  }) {
    const newItem = childForm.getValues();
    const isValid = !childForm.validate().hasErrors;

    if (!isValid) {
      utils_notification_show({
        crudType: "error",
        message: "Vui lòng nhập đầy đủ các field yêu cầu",
      });
      return;
    }

    // Simply append the new item without modifying existing items
    setResourceList((prev) => [
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
    row,
    childForm,
    disclosure,
  }: {
    row?: MRT_Row<IResource>;
    childForm: UseFormReturnType<IResource>;
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

    setResourceList((prev) =>
      prev.map((item, index) => {
        // For new items (no id or id = 0), match by index
        if (!row.original.id || row.original.id === 0) {
          return index === row.index
            ? { ...item, ...updatedItem, isOld: false }
            : item;
        }

        // For existing items with id, match by id and mark as modified
        if (item.id === row.original.id) {
          return {
            ...item,
            ...updatedItem,
            isOld: false // Always set to false when modified
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

  function handleDelete(row: MRT_Row<IResourceWithTracking>) {
    setResourceList((prev) => {
      const target = row.original;

      // If no id (temporary data created in this session)
      if (!target.id || target.id === 0) {
        // Remove it completely from the list
        return prev.filter((_, idx) => idx !== row.index);
      }

      // If has id (existing data from database)
      // Mark as deleted and set isOld: false to ensure it's sent to backend
      return prev.map((item) =>
        item.id === target.id
          ? { ...item, isEnabled: false, isOld: false }
          : item
      );
    });
  }

  return (
    <CustomDataTable
      columns={columns}
      data={resourceList.filter((t) => t.isEnabled != false)}
      enableRowSelection={!viewOnly}
      enableColumnFilters
      enableRowNumbers
      renderTopToolbarCustomActions={({ table }) => {
        if (viewOnly) return null;
        return (
          <>
            <ResourceTabCreateOrUpdate
              onClick={handleCreate}
              standardData={standardData || []}
            />
            <ResourceMobilizationTabDeleteList
              values={table.getSelectedRowModel().rows}
              onDeleteList={(rows: MRT_Row<IResource>[]) => {
                setResourceList((prev) => {
                  // Remove items without id (temporary items)
                  let result = prev.filter(
                    (_, idx) =>
                      !rows.some((row) => !row.original.id && row.index === idx)
                  );

                  // Mark items with id as deleted
                  result = result.map((item, idx) => {
                    const row = rows.find((r) => r.index === idx);
                    if (row && row.original.id && row.original.id > 0) {
                      return { ...item, isEnabled: false, isOld: false };
                    }
                    return item;
                  });

                  return result;
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
            <ResourceTabCreateOrUpdate
              data={row}
              onClick={handleUpdate}
              standardData={standardData || []}
            />
            <ResourceMobilizationTabDelete
              label={row.original.eaqStandard?.code ?? ""}
              onDelete={() => handleDelete(row)}
            />
          </CustomCenterFull>
        );
      }}
    />
  );
}
