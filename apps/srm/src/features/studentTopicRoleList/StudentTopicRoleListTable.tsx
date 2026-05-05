import StudentTopicRoleListCreateUpdateModal from "@/features/studentTopicRoleList/StudentTopicRoleListCreateUpdateModal";
import StudentTopicRoleListImportButton from "@/features/studentTopicRoleList/StudentTopicRoleListImportButton";
import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";

export default function StudentTopicRoleListTable() {
  const query = useCustomReactQuery({
    queryKey: ['studentTopicRoleList'],
    axiosFn: () => titleService.GetAllByType(EnumTitleType.StudentProjectRole)
  })

  const columns = useMemo<CustomColumnDef<SRMTitle>[]>(() => [
    {
      header: "Mã vai trò",
      accessorKey: "code",
    },
    {
      header: "Tên vai trò",
      accessorKey: "name",
    },
    {
      header: "Không sử dụng",
      accessorKey: "isDeactivate",
      type: "squareCheck"
    },
    {
      header: "Là chủ nhiệm",
      accessorKey: "isLeader",
      type: "squareCheck"
    },
    {
      header: "Ghi chú",
      accessorKey: "note",
    },
  ], [query.data]);

  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã vai trò" },
      { fieldName: "name", header: "Tên vai trò" },
      { fieldName: "isDeactivate", header: "Không sử dụng" },
      { fieldName: "note", header: "Ghi chú" },
    ],
  };

  return (
    <CustomFieldset title="Danh mục vai trò thực hiện đề tài sinh viên" >
      <CustomDataTableAPI
        deleteFn={titleService.delete}
        deleteListFn={titleService.deleteListIds}
        enableRowSelection
        enableRowNumbers={false}
        columns={columns}
        query={query}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows =
            table
              .getSelectedRowModel()
              .flatRows.map((item) => item.original) || [];

          return (
            <>
              <StudentTopicRoleListCreateUpdateModal />
              <StudentTopicRoleListImportButton />
              <AQButtonExportData
                objectName="Danh sách vai trò thực hiện đề tài sinh viên"
                data={selectedRows.length > 0 ? selectedRows : query.data || []}
                exportConfig={exportConfig}
              />
            </>
          )
        }}
        renderRowActions={({ row, table }) => {
          return (
            <>
              <StudentTopicRoleListCreateUpdateModal
                values={row.original}
              />

            </>
          )
        }}
      />
    </CustomFieldset>
  )
}