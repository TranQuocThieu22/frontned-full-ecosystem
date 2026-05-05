"use client";

import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumLabelMeasurementUnit, EnumMeasurementUnit } from "@/shared/consts/enum/EnumMeasurementUnit";
import { SRMPublicationType } from "@/shared/interfaces/SRMPublicationType";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PublicationTypeListCreateUpdate from "./PublicationTypeListCreateUpdate";
import PublicationTypeListDelete from "./PublicationTypeListDelete";
import PublicationTypeListDeleteList from "./PublicationTypeListDeleteList";
import PublicationTypeListExport from "./PublicationTypeListExport";
import PublicationTypeListImport from "./PublicationTypeListImport";

export default function PublicationTypeListTable() {

  const publicationTypeQuery = useCustomReactQuery({
    queryKey: ["PublicationTypeListTable",],
    axiosFn: () => publicationTypeService.getAll({
      cols: ["SRMPublication"],
    }),
  });

  const columns = useMemo<MRT_ColumnDef<SRMPublicationType>[]>(() => [
    {
      header: "Mã loại công bố",
      accessorKey: "code",
    },
    {
      header: "Tên loại công bố",
      accessorKey: "name",
      size: columnSizeObject.name
    },
    {
      header: "Mã nhóm công bố",
      accessorKey: "srmPublicationId",
      Cell: ({ row }) => row.original.srmPublication?.code ?? "",
    },
    {
      header: "Đơn vị tính",
      accessorKey: "measurementUnit",
      accessorFn: (row) => EnumLabelMeasurementUnit[row.measurementUnit as EnumMeasurementUnit] || "",
    },
    {
      header: "Số giờ quy đổi",
      accessorKey: "convertedHour",
    },
    {
      header: "Số điểm quy đổi",
      accessorKey: "convertedScore",
    },
    {
      header: "Ghi chú",
      accessorKey: "note",
      size: 280
    },
    {
      header: "Không sử dụng",
      accessorKey: "isDeactivate",
      Cell: ({ row }) =>
        <CustomCenterFull>
          <CustomThemeIconSquareCheck checked={row.original.isDeactivate} />
        </CustomCenterFull>,
    },
  ], []);

  return (
    <CustomFieldset
      title="Danh mục loại công trình công bố"
    >
      <CustomDataTable
        columns={columns}
        enableRowSelection={true}
        isLoading={publicationTypeQuery.isLoading}
        isError={publicationTypeQuery.isError}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <PublicationTypeListCreateUpdate actionType="create" />
              <PublicationTypeListImport />
              <PublicationTypeListExport table={table} />
              <PublicationTypeListDeleteList table={table} />
            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <PublicationTypeListCreateUpdate values={row.original} actionType="update" />
              <PublicationTypeListDelete id={row.original.id ?? 0} code={row.original.code ?? ""} />
            </CustomCenterFull>
          )
        }}
        data={publicationTypeQuery.data ?? []}
      />
    </CustomFieldset>
  );
}
