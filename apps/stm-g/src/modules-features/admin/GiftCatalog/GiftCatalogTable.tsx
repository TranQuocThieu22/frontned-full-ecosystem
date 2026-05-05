'use client'
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonCreateByImportFile,
  AQButtonExportData,
  MyButtonViewPDF,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
  MyNumberFormatter
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import GiftCatalogCreateUpdate from "./GiftCatalogCreateUpdate";
import GiftCatalogDelete from "./GiftCatalogDelete";
import GiftCatalogDeleteList from "./GiftCatalogDeleteList";
import { IGiftCatalog } from "./interfaces";
import { mockData } from "./mockDatas";


export default function GiftCatalogTable() {
  const query = useQuery<IGiftCatalog[]>({
    queryKey: ['GiftCatalogTable'],
    queryFn: async () => mockData
  });
  const form = useForm<any>({
    initialValues: {},
  });
  const columns = useMemo<MRT_ColumnDef<IGiftCatalog>[]>(
    () => [
      {
        header: "Mã Quà",
        accessorKey: "code",
      },
      {
        header: "Tên Quà",
        accessorKey: "giftName",
      },
      {
        header: "Mô tả",
        accessorKey: "description",
        size: 300,
      },
      {
        header: "Ảnh minh họa",
        accessorKey: "imageUrl",
        Cell: ({ cell }) => (
          <MyButtonViewPDF />
        )
      },
      {
        header: "Số lượng Ticker quy đổi",
        accessorKey: "ticketConversionAmount",
      },
      {
        header: "Giá trị ước tính (VND)",
        accessorKey: "estimatedValue",
        Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />
      },
      {
        header: "Đơn vị tính",
        accessorKey: "unit",
      },
    ],
    []
  );
  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã Quà" },
      { fieldName: "giftName", header: "Tên Quà" },
      { fieldName: "description", header: "Mô tả" },
      { fieldName: "imageUrl", header: "Ảnh minh họa" },
      { fieldName: "ticketConversionAmount", header: "Số lượng Ticker quy đổi" },
      { fieldName: "estimatedValue", header: "Giá trị ước tính (VND)" },
      { fieldName: "unit", header: "Đơn vị tính" },
    ]
  };
  return (
    <MyFieldset title="Danh sách quà tặng">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        enableRowSelection
        renderTopToolbarCustomActions={({ table }) => (
          <MyCenterFull>
            <GiftCatalogCreateUpdate />
            <AQButtonCreateByImportFile onSubmit={() => { }} form={form} />
            <AQButtonExportData
              objectName={"dsQuaTang"}
              data={query.data || []}
              exportConfig={exportConfig}
            />
            <GiftCatalogDeleteList
              values={table
                .getSelectedRowModel()
                .flatRows.flatMap((item) => item.original)} />
          </MyCenterFull>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <GiftCatalogCreateUpdate values={row.original} />
            <GiftCatalogDelete id={0} code={row.original.code!} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
