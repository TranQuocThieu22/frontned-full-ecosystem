"use client";

import { service_eventGroup } from "@/api/services/service_eventGroup";
import { EventGroup } from "@/interfaces/eventGroup";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Checkbox, Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import EventGroupCreateButton from "./EventGroupCreateButton";
import EventGroupDeleteButton from "./EventGroupDeleteButton";
import EventGroupDeleteListButton from "./EventGroupDeleteListButton";
import EventGroupExportButton from "./EventGroupExportButton";
import EventGroupImportButton from "./EventGroupImportButton";
import EventGroupUpdateButton from "./EventGroupUpdateButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function EventGroupTable() {
  const permissionStore = usePermissionStore();
  const {
    data: eventGroups,
    isLoading,
    isError,
    refetch,
  } = useCustomReactQuery({
    queryKey: ["eventGroup"],
    axiosFn: () => service_eventGroup.getAll(),
  });
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const columns = useMemo<MRT_ColumnDef<EventGroup>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Mã nhóm hoạt động",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Tên nhóm hoạt động",
        enableSorting: true,
      },
      {
        accessorKey: "isDefault",
        header: "Mặc định",
        Cell: ({ row }) => (
          <CustomCenterFull>
            <Checkbox checked={row.original.isDefault} readOnly />
          </CustomCenterFull>
        ),
        enableSorting: true,
      },

    ],
    []
  );

  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã hoạt động" },
      { fieldName: "name", header: "Tên hoạt động" },
      { fieldName: "isDefault", header: "Mặc định" },
    ],
  };

  return (
    <CustomFieldset title="Danh mục nhóm hoạt động">
      <CustomDataTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        data={eventGroups || []}
        enableRowNumbers
        enableColumnFilters
        enableGlobalFilter
        enablePagination
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
        rowActionSize={120}
        renderTopToolbarCustomActions={({ table }) => (
          <Group>
            <EventGroupCreateButton />
            <EventGroupImportButton />
            {permissionStore.state.currentPermissionPage?.isExport && (
              <EventGroupExportButton data={eventGroups || []} />
            )}
            {permissionStore.state.currentPermissionPage?.isDelete && (
              <EventGroupDeleteListButton
                values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)}
              />
            )}
          </Group>
        )}
        renderRowActions={({ row }) => {
          const eventGroup = row.original;
          return (
            <CustomCenterFull>
              <EventGroupUpdateButton eventGroup={eventGroup} refetch={refetch} />
              <EventGroupDeleteButton code={eventGroup.code!} id={eventGroup.id!} />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
