"use client";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Checkbox, Fieldset, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_eazkyurdoi_Create from "./F_eazkyurdoi_Create";
import F_eazkyurdoi_Update from "./F_eazkyurdoi_Update";
import F_eazkyurdoi_Delete from "./F_eazkyurdoi_Delete";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";

export interface DinhMuc {
  maLoai?: string;
  tenLoai?: string;
  thuocLoai?: number;
  donViTinh?: string;
  doiTuongSuDung?: string;
  dinhMuc?: number;
  donGiaToiDa: number;
  suDung?: boolean;
  ghiChu?: string;
}
const dummyData: DinhMuc[] = [
  {
    maLoai: "PMKT",
    tenLoai: "Phần mềm kế toán",
    thuocLoai: 1,
    donViTinh: "Bộ",
    doiTuongSuDung: "Dùng chung",
    dinhMuc: 1,
    donGiaToiDa: 45000000,
    suDung: true,
    ghiChu: "",
  },
];
export default function F_eazkyurdoi_Read() {
  const query = useQuery<DinhMuc[]>({
    queryKey: [`F_gwotx5p7fu_Read`],
    queryFn: async () => dummyData || [],
  });
  const columns = useMemo<MRT_ColumnDef<DinhMuc>[]>(
    () => [
      {
        accessorKey: "maLoai",
        header: "Mã loại định mức",
        size: 150,
      },
      {
        accessorKey: "tenLoai",
        header: "Tên loại định mức",
        size: 200,
      },
      {
        accessorKey: "thuocLoai",
        header: "Thuộc loại",
        size: 200,
      },
      {
        accessorKey: "donViTinh",
        header: "Đơn vị tính",
        size: 100,
      },
      {
        accessorKey: "doiTuongSuDung",
        header: "Đối tượng sử dụng",
        size: 150,
      },
      {
        accessorKey: "dinhMuc",
        header: "Định mức",
        size: 100,
      },
      {
        accessorKey: "donGiaToiDa",
        header: "Đơn giá tối đa",
        size: 150,
        Cell: ({ cell }) => `${cell.getValue<number>().toLocaleString()} VND`,
      },
      {
        accessorKey: "suDung",
        header: "Sử dụng",
        size: 100,
        Cell: ({ cell }) => (
          <Checkbox checked={cell.getValue<boolean>()} readOnly />
        ),
      },
      {
        accessorKey: "ghiChu",
        header: "Ghi chú",
        size: 200,
      },
    ],
    []
  );

  const form = useForm();

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";

  return (
    <Fieldset legend="Danh loại định mức">
      <MyDataTable
        enableSelectAll
        columns={columns}
        data={query.data || []}
        exportAble
        renderTopToolbarCustomActions={() => (
          <Group>
            <F_eazkyurdoi_Create />
            <AQButtonCreateByImportFile
              form={form}
              onSubmit={() => {}}
            ></AQButtonCreateByImportFile>
            <Button color="red">Xoá</Button>
          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <F_eazkyurdoi_Update values={row.original}></F_eazkyurdoi_Update>
            <F_eazkyurdoi_Delete></F_eazkyurdoi_Delete>
          </MyCenterFull>
        )}
      ></MyDataTable>
    </Fieldset>
  );
}
