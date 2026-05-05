"use client";

import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyButton, MyButtonDeleteList, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString, utils_currency_formatWithSuffix } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import GiftInventoryCreate from "./GiftInventoryCreate";
import GiftInventoryUpdate from "./GiftInventoryUpdate";
import { EBranch, IGiftInventoryEntry } from "./interfaces/GiftInventoryViewModel";

export default function GiftInventoryTable() {

  const query = useQuery({
    queryKey: ["gift-inventory-entries"],
    queryFn: () => { return mockData; },
  });

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const branchLabelMap = {
    [EBranch.THU_DUC]: "Thủ Đức",
    [EBranch.BINH_THANH]: "Bình Thạnh",
    [EBranch.QUAN_1]: "Quận 1",
    [EBranch.QUAN_3]: "Quận 3",
    [EBranch.TAN_BINH]: "Tân Bình"
  };

  const columns = useMemo<MRT_ColumnDef<IGiftInventoryEntry>[]>(() => [
    {
      header: "Thời gian nhập",
      accessorKey: "entryTime",
      accessorFn: (row) => `${utils_date_dateToDDMMYYYString(row.entryTime)} ${row.entryTime.toLocaleTimeString('vi-VN', { hour12: false })}`,
      size: 140,
    },
    {
      header: "Người nhập",
      accessorKey: "entryUser",
      accessorFn: (row) => `${row.entryUser} (${row.entryUserRole})`,
      size: 200,
    },
    {
      header: "Chi nhánh",
      accessorKey: "branch",
      accessorFn: (row) => branchLabelMap[row.branch],
      size: 120,
    },
    {
      header: "Nguồn nhập",
      accessorKey: "source",
      size: 150,
    },
    {
      header: "Ghi chú phiếu nhập",
      accessorKey: "entryNote",
      size: 180,
    },
    {
      header: "Tên Quà",
      accessorKey: "giftName",
      size: 200,
    },
    {
      header: "Số lượng nhập",
      accessorKey: "quantity",
      size: 100,
    },
    {
      header: "Đơn giá nhập (VNĐ)",
      accessorKey: "unitPrice",
      accessorFn: (row) => utils_currency_formatWithSuffix(row.unitPrice, ""),
      size: 150,
    },
    {
      header: "Ghi chú chi tiết",
      accessorKey: "detailNote",
      size: 150,
    },
  ], []);

  return (
    <MyFieldset
      title="Danh sách phiếu nhập quà tặng"
    >
      <MyDataTable
        columns={columns}
        enableRowSelection={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <GiftInventoryCreate />
              <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
              <MyButton crudType="export" />
              <MyButtonDeleteList onSubmit={() => { }} contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.id).join(", ")} />
            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <GiftInventoryUpdate values={row.original} />
            </MyCenterFull>
          )
        }}
        data={query.data || []}
      />
    </MyFieldset>
  );
}

const mockData: IGiftInventoryEntry[] = [
  {
    id: 1,
    entryTime: new Date("2025-07-15T10:00:00"),
    entryUser: "Nguyễn Thị Lan",
    entryUserRole: "QLĐT Thủ Đức",
    branch: EBranch.THU_DUC,
    source: "Nhà cung cấp ABC",
    entryNote: "Nhập quà đợt hè 2025",
    giftCode: "QUA001",
    giftName: "Bút chì màu cao cấp",
    quantity: 100,
    unitPrice: 25000,
    detailNote: "Màu sắc ngẫu nhiên"
  },
  {
    id: 2,
    entryTime: new Date("2025-07-15T10:00:00"),
    entryUser: "Nguyễn Thị Lan",
    entryUserRole: "QLĐT Thủ Đức",
    branch: EBranch.THU_DUC,
    source: "Nhà cung cấp ABC",
    entryNote: "Nhập quà đợt hè 2025",
    giftCode: "QUA002",
    giftName: "Sổ tay A5 có bìa cứng",
    quantity: 50,
    unitPrice: 35000,
    detailNote: ""
  },
  {
    id: 3,
    entryTime: new Date("2025-07-14T14:30:00"),
    entryUser: "Trần Văn Hùng",
    entryUserRole: "QLĐT Bình Thạnh",
    branch: EBranch.BINH_THANH,
    source: "Kho tổng công ty",
    entryNote: "Bổ sung quà tặng cho tháng 7",
    giftCode: "QUA004",
    giftName: "Bình nước giữ nhiệt 500ml",
    quantity: 20,
    unitPrice: 80000,
    detailNote: "Có 1 cái bị móp nhẹ"
  },
  {
    id: 4,
    entryTime: new Date("2025-09-14T14:30:00"),
    entryUser: "Trần Văn Hùng",
    entryUserRole: "QLĐT Bình Thạnh",
    branch: EBranch.BINH_THANH,
    source: "Kho tổng công ty",
    entryNote: "Bổ sung quà tặng cho tháng 7",
    giftCode: "QUA005",
    giftName: "Móc khoá hình thú dễ thương",
    quantity: 100,
    unitPrice: 10000,
    detailNote: ""
  },
  {
    id: 5,
    entryTime: new Date("2025-07-13T09:00:00"),
    entryUser: "Lê Thị Mai",
    entryUserRole: "Thủ kho Quận 1",
    branch: EBranch.QUAN_1,
    source: "Nhà cung cấp XYZ",
    entryNote: "Nhập đợt quà tặng mới",
    giftCode: "QUA008",
    giftName: "Balo học sinh",
    quantity: 10,
    unitPrice: 250000,
    detailNote: "Loại lớn"
  }
];