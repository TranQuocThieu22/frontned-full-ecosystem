"use client";

import { MyButton, MyButtonDeleteList, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { utils_currency_formatWithSuffix } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import GiftInventoryListDelete from "./GiftInventoryListDelete";
import GiftInventorySelectList from "./GiftInventorySelectList";
import { IGiftInventoryItem } from "./interfaces/GiftInventoryViewModel";

interface Props {
  data?: IGiftInventoryItem[];
  onDataChange?: (data: IGiftInventoryItem[]) => void;
}

export default function GiftInventoryList({ data, onDataChange }: Props) {

  const columns = useMemo<MRT_ColumnDef<IGiftInventoryItem>[]>(() => [
    {
      header: "Mã Quà",
      accessorKey: "giftCode",
      size: 120,
      enableEditing: false,
    },
    {
      header: "Tên Quà",
      accessorKey: "giftName",
      size: 200,
      enableEditing: false,
    },
    {
      header: "Số lượng nhập",
      accessorKey: "quantity",
      size: 120,
      enableEditing: true,
    },
    {
      header: "Đơn giá nhập (VNĐ)",
      accessorKey: "unitPrice",
      size: 150,
      enableEditing: true,
      Cell: ({ cell }) => utils_currency_formatWithSuffix(cell.getValue<number>(), ""),
    },
  ], []);

  return (
    <MyDataTable
      columns={columns}
      data={data || mockData}
      enableColumnFilters={false}
      enableGlobalFilter={false}
      enablePagination={true}
      enableRowSelection={true}
      enableEditing={true}
      editDisplayMode="cell"
      onEditingRowSave={({ row, values }) => {
        if (onDataChange) {
          const newData = (data || mockData).map((item) =>
            item.id === row.original.id ? { ...item, ...values } : item
          );
          onDataChange(newData);
        }
      }}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <GiftInventoryListDelete id={row.original.id} code={row.original.giftCode} />
          </MyCenterFull>
        )
      }}
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <>
            <GiftInventorySelectList />
            <MyButton crudType="save" />
            <MyButton crudType="export" />
            <MyButtonDeleteList
              onSubmit={() => { }}
              contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.giftCode).join(", ")}
            />
          </>
        )
      }}
    />
  );
}

const mockData: IGiftInventoryItem[] = [
  {
    id: 1,
    giftCode: "QUA001",
    giftName: "Bút chì màu cao cấp",
    quantity: 100,
    unitPrice: 25000
  },
  {
    id: 2,
    giftCode: "QUA002",
    giftName: "Sổ tay A5 có bìa cứng",
    quantity: 50,
    unitPrice: 35000
  },
  {
    id: 3,
    giftCode: "QUA004",
    giftName: "Bình nước giữ nhiệt 500ml",
    quantity: 20,
    unitPrice: 80000
  },
  {
    id: 4,
    giftCode: "QUA005",
    giftName: "Móc khoá hình thú dễ thương",
    quantity: 100,
    unitPrice: 10000
  },
  {
    id: 5,
    giftCode: "QUA008",
    giftName: "Balo học sinh",
    quantity: 10,
    unitPrice: 250000
  }
];
