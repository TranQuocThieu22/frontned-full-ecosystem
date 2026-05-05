"use client";

import { service_department } from "@/api/services/service_department";
import { Department } from "@/interfaces/department";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import OrganizingUnitCreateButton from "./OrganizingUnitCreateButton";
import OrganizingUnitDeleteButton from "./OrganizingUnitDeleteButton";
import OrganizingUnitDeleteListButton from "./OrganizingUnitDeleteListButton";
import OrganizingUnitExportButton from "./OrganizingUnitExportButton";
import OrganizingUnitImportButton from "./OrganizingUnitImportButton.";
import OrganizingUnitUpdateButton from "./OrganizingUnitUpdateButton";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function OrganizingUnitTable() {
  const permissionStore = usePermissionStore();

  const query = useCustomReactQuery({
    queryKey: ["getDepartmentOnly"],
    axiosFn: () => service_department.getDepartmentOnly(),
  });


  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã đơn vị" },
      { fieldName: "name", header: "Tên đơn vị" },
      { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
      { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
    ],
  };

  const columns = useMemo<MRT_ColumnDef<Department>[]>(() => [
    { header: "Mã đơn vị", accessorKey: "code" },
    { header: "Tên đơn vị", accessorKey: "name" },

  ], []);

  return (
    <CustomFlexColumn>
      <CustomFieldset title={`Danh mục đơn vị tổ chức`}>
        <CustomDataTable
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              <OrganizingUnitCreateButton />
              <OrganizingUnitImportButton />
              {permissionStore.state.currentPermissionPage?.isExport && (
                <OrganizingUnitExportButton data={query.data || []} />
              )}
              <OrganizingUnitDeleteListButton
                values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)}
              />
            </Group>
          )}
          columns={columns}
          data={(query.data || []).map((item) => ({ ...item, id: item.id || 0 }))}
          renderRowActions={({ row }) => (
            <CustomCenterFull>
              <OrganizingUnitUpdateButton data={row.original} />
              <OrganizingUnitDeleteButton id={row.original.id!} code={row.original.code!} />
            </CustomCenterFull>
          )}
        />
      </CustomFieldset>
    </CustomFlexColumn>
  );
}
