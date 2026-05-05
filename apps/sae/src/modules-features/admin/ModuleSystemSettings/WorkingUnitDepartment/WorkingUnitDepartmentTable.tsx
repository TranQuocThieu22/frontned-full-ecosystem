"use client";

import { service_department } from "@/api/services/service_department";
import { ENUM_DEPARTMENT_TYPE } from "@/constants/enum/global";
import { Department } from "@/interfaces/department";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import WorkingUnitDepartmentCreateButton from "./WorkingUnitDepartmentCreateButton";
import WorkingUnitDepartmentDeleteButton from "./WorkingUnitDepartmentDeleteButton";
import WorkingUnitDepartmentDeleteListButton from "./WorkingUnitDepartmentDeleteListButton";
import WorkingUnitDepartmentExportButton from "./WorkingUnitDepartmentExportButton";
import WorkingUnitDepartmentImtportButton from "./WorkingUnitDepartmentImtportButton";
import WorkingUnitDepartmentUpdateButton from "./WorkingUnitDepartmentUpdateButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function WorkingUnitDepartmentTable() {
  const permissionStore = usePermissionStore();
  const departmentWorkingUnitQuery = useCustomReactQuery({
    queryKey: ["getWorkingUnit"],
    axiosFn: () => service_department.getWorkingUnit(),
  });

  const columns = useMemo<MRT_ColumnDef<Department>[]>(
    () => [
      {
        header: "Mã đơn vị",
        accessorKey: "code",
      },
      {
        header: "Tên đơn vị",
        accessorKey: "name",
      },
      {
        header: "Loại đơn vị",
        accessorKey: "type",
        accessorFn: (row) => {
          return row.type ? ENUM_DEPARTMENT_TYPE[row.type] : "";
        },
      },

    ],
    []
  );

  return (
    <CustomFieldset title={"Danh mục đơn vị công nhận điểm"}>
      <CustomFlexColumn>
        <CustomDataTable
          isLoading={departmentWorkingUnitQuery.isLoading}
          isError={departmentWorkingUnitQuery.isError}
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <>
                <Group>
                  <WorkingUnitDepartmentCreateButton />
                  <WorkingUnitDepartmentImtportButton />
                  {permissionStore.state.currentPermissionPage?.isExport && (
                    <WorkingUnitDepartmentExportButton
                      data={departmentWorkingUnitQuery?.data || []}
                    />
                  )}
                  <WorkingUnitDepartmentDeleteListButton
                    values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)}
                  />
                </Group>
              </>
            );
          }}
          columns={columns}
          data={departmentWorkingUnitQuery.data || []}
          renderRowActions={({ row }) => {
            return (
              <CustomCenterFull>
                <WorkingUnitDepartmentUpdateButton values={row.original} />
                <WorkingUnitDepartmentDeleteButton
                  code={row.original.code || ""}
                  id={row.original.id!}
                />
              </CustomCenterFull>
            );
          }}
        />
      </CustomFlexColumn>
    </CustomFieldset>
  );
}
