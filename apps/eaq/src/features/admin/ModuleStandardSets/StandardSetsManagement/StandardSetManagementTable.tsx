"use client";
import { service_EAQStandardSet } from "@/shared/APIs/service_EAQStandardSet";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import StandardSetCreateUpdateModal from "./StandardSetCreateUpdateModal";
import StandardSetDeleteButton from "./StandardSetDeleteButton";
import StandardSetDeleteListButton from "./StandardSetDeleteListButton";
import StandardSetExportButton from "./StandardSetExportButton";
import StandardSetImportButton from "./StandardSetImportButton";
import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export enum AccreditationType {
  TrainingProgram = 1,
  EducationtalInstitution = 2,
}

export const AccreditationTypeLabel: Record<AccreditationType, string> = {
  [AccreditationType.TrainingProgram]: "Chương trình đào tạo",
  [AccreditationType.EducationtalInstitution]: "Cơ sở giáo dục",
};

export default function StandardSetManagementTable() {
  const standardSetQuery = useCustomReactQuery({
    queryKey: ["StandardSetManagementTable_Read"],
    axiosFn: async () => service_EAQStandardSet.getAll(),
  });

  const columns = useMemo<MRT_ColumnDef<IStandardSet>[]>(
    () => [
      { accessorKey: "code", header: "Mã bộ tiêu chuẩn", size: 250 },
      { accessorKey: "name", header: "Tên bộ tiêu chuẩn", size: 400 },
      { accessorKey: "description", header: "Mô tả Bộ tiêu chuẩn", size: 600 },
      {
        accessorKey: "issuedDate",
        header: "Ngày ban hành",
        accessorFn: (row) => {
          return row.issuedDate
            ? dateUtils.toDDMMYYYY(new Date(row.issuedDate))
            : "";
        },
      },
      { accessorKey: "version", header: "Tên phiên bản" },
      {
        accessorKey: "accreditationType",
        header: "Loại kiểm định",
        accessorFn: (row) => {
          return row.accreditationType
            ? AccreditationTypeLabel[row.accreditationType as AccreditationType]
            : "";
        },
      },
      {
        accessorKey: "file",
        header: "File tiêu chuẩn",
        accessorFn: (row) => (
          <CustomCenterFull>
            <CustomButtonViewFileAPI filePath={row.imagePath ? row.imagePath : undefined} />
          </CustomCenterFull>
        ),
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách bộ tiêu chuẩn">
      <CustomDataTable
        isLoading={standardSetQuery.isLoading}
        isError={standardSetQuery.isError}
        enableRowSelection
        columns={columns}
        data={standardSetQuery.data || []}
        renderTopToolbarCustomActions={({ table }) => {
          // Get selected rows from table of destructured object
          const selectedRows =
            table.getSelectedRowModel().flatRows.map((item) => item.original) ||
            [];

          return (
            <Group>
              <StandardSetCreateUpdateModal />
              <StandardSetImportButton
                isLoading={standardSetQuery.isFetching}
              />
              <StandardSetExportButton
                isLoading={standardSetQuery.isFetching}
                values={selectedRows.length > 0 ? selectedRows : standardSetQuery.data || []} />
              <StandardSetDeleteListButton
                isLoading={standardSetQuery.isFetching}
                values={selectedRows}
                resetRowSelection={table.resetRowSelection} />
            </Group>
          );
        }}
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            <StandardSetCreateUpdateModal values={row.original} />
            <StandardSetDeleteButton
              id={row.original.id}
              code={row.original.code || ""}
              isLoading={standardSetQuery.isFetching}
            />
          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  );
}
