"use client";

import { service_address } from "@/api/services/service_address";
import { Address } from "@/interfaces/address";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AddressInsideSchoolDeleteList from "./AddressInsideSchoolDeleteList";
import AddressOutsideSchoolCreateButton from "./AddressOutsideSchoolCreateButton";
import AddressOutsideSchoolDeleteButton from "./AddressOutsideSchoolDeleteButton";
import AddressOutsideSchoolExportButton from "./AddressOutsideSchoolExportButton";
import AddressOutsideSchoolImportButton from "./AddressOutsideSchoolImportButton";
import AddressOutsideSchoolUpdateButton from "./AddressOutsideSchoolUpdateButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function AddressOutsideSchoolTable() {
  const permissionStore = usePermissionStore();

  const Q_address_isNotInsiteSchool = useCustomReactQuery({
    queryKey: ["address", "isNotInsiteSchool"],
    axiosFn: () =>
      service_address.findbyInsiteSchool({
        isInsiteSchool: false,
      }),
  });

  const columns = useMemo<MRT_ColumnDef<Address>[]>(() => [
    { header: "Mã địa điểm", accessorKey: "code" },
    { header: "Tên địa điểm", accessorKey: "name" },
    { header: "Sức chứa", accessorKey: "capacity" },

  ], []);

  return (
    <CustomFlexColumn>
      <CustomFieldset title={`Danh mục địa điểm tổ chức ngoài Trường`}>
        <CustomDataTable
          isLoading={Q_address_isNotInsiteSchool.isLoading}
          isError={Q_address_isNotInsiteSchool.isError}
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              <AddressOutsideSchoolCreateButton />
              <AddressOutsideSchoolImportButton />
              {permissionStore.state.currentPermissionPage?.isExport && (
                <AddressOutsideSchoolExportButton data={Q_address_isNotInsiteSchool.data || []} />
              )}
              <AddressInsideSchoolDeleteList
                values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)}
              />
            </Group>
          )}
          columns={columns}
          data={Q_address_isNotInsiteSchool.data || []}
          renderRowActions={({ row }) => (
            <CustomCenterFull>
              <AddressOutsideSchoolUpdateButton data={row.original} />
              <AddressOutsideSchoolDeleteButton id={row.original.id!} code={row.original.code!} />
            </CustomCenterFull>
          )}
        />
      </CustomFieldset>
    </CustomFlexColumn>
  );
}
