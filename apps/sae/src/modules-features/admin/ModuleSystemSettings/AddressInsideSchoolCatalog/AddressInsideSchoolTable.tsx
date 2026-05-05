"use client";
import { service_address } from "@/api/services/service_address";
import { Address } from "@/interfaces/address";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AddressInsideSchoolCreateButton from "./AddressInsideSchoolCreateButton";
import AddressInsideSchoolDeleteButton from "./AddressInsideSchoolDeleteButton";
import AddressInsideSchoolDeleteList from "./AddressInsideSchoolDeleteList";
import AddressInsideSchoolExportButton from "./AddressInsideSchoolExportButton";
import AddressInsideSchoolImportButton from "./AddressInsideSchoolImportButton";
import AddressInsideSchoolUpdateButton from "./AddressInsideSchoolUpdateButton";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function AddressInsideSchoolTable() {
  const permissionStore = usePermissionStore();

  const query_Address_FindbyInsiteSchool = useCustomReactQuery({
    queryKey: ["address", "isInsiteSchool"],
    axiosFn: () =>
      service_address.findbyInsiteSchool({
        isInsiteSchool: true,
      }),
  });

  const columns = useMemo<MRT_ColumnDef<Address>[]>(() => [
    { header: "Mã địa điểm", accessorKey: "code" },
    { header: "Tên địa điểm", accessorKey: "name" },
    { header: "Sức chứa", accessorKey: "capacity" },

  ], []);

  return (
    <CustomFlexColumn>
      <CustomFieldset title={`Danh mục địa điểm tổ chức trong Trường`}>
        <CustomDataTable
          isLoading={query_Address_FindbyInsiteSchool.isLoading}
          isError={query_Address_FindbyInsiteSchool.isError}
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              <AddressInsideSchoolCreateButton />
              <AddressInsideSchoolImportButton />
              {permissionStore.state.currentPermissionPage?.isExport && (
                <AddressInsideSchoolExportButton
                  data={query_Address_FindbyInsiteSchool.data || []}
                />
              )}
              <AddressInsideSchoolDeleteList
                values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)}
              />
            </Group>
          )}
          columns={columns}
          data={query_Address_FindbyInsiteSchool.data || []}
          renderRowActions={({ row }) => (
            <CustomCenterFull>
              <AddressInsideSchoolUpdateButton data={row.original} />
              <AddressInsideSchoolDeleteButton code={row.original.code!} id={row.original.id!} />
            </CustomCenterFull>
          )}
        />
      </CustomFieldset>
    </CustomFlexColumn>
  );
}
