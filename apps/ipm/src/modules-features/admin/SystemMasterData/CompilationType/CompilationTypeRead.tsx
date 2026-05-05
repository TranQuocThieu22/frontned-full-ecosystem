'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Checkbox } from "@mantine/core";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CompilationTypeCreate from "./CompilationTypeCreate";
import CompilationTypeDelete from "./CompilationTypeDelete";
import CompilationTypeDeleteList from "./CompilationTypeDeleteList";
import CompilationTypeUpdate from "./CompilationTypeUpdate";
export interface CompilationType {
  id: number;
  code: string;
  name: string;
  hours: number;
  score: number | null;
  isDiscontinued: boolean;
  notes: string;
}
export default function CompilationTypeRead() {

  const columns = useMemo<MRT_ColumnDef<CompilationType>[]>(
    () => [
      {
        header: "Mã loại biên soạn",
        accessorKey: "code"
      },
      {
        header: "Tên loại biên soạn",
        accessorKey: "name"
      },
      {
        header: "Số giờ/trang",
        accessorKey: "hours"
      },
      {
        header: "Số điểm",
        accessorKey: "score"
      },
      {
        header: "Ngừng sử dụng",
        accessorKey: "isStop",
        accessorFn(row) {
          return (
            <Checkbox checked={row.isDiscontinued} readOnly></Checkbox>
          )
        }
      },
      {
        header: "Ghi chú",
        accessorKey: "note"
      },

    ],
    []
  );
  return (
    <MyFieldset title="Danh mục loại biên soạn sách, giáo trình">
      <MyDataTable
        columns={columns}
        data={mockData || []}
        enableRowSelection

        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <CompilationTypeCreate />
              <MyButton crudType="import" />
              <MyButton crudType="export" />
              <CompilationTypeDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <CompilationTypeUpdate values={row.original} />
              <CompilationTypeDelete id={row.original.id || 0} code={row.original.code} />
            </MyCenterFull>
          )
        }}
      />
    </MyFieldset>
  )
}


const mockData: CompilationType[] = [
  {
    id: 1,
    code: 'SCK',
    name: 'Sách chuyên khảo (viết lần đầu)',
    hours: 20,
    score: null,
    isDiscontinued: false,
    notes: ''
  },
  {
    id: 2,
    code: 'SCKSC',
    name: 'Sách chuyên khảo (sửa chữa)',
    hours: 20,
    score: null,
    isDiscontinued: false,
    notes: ''
  },
  {
    id: 3,
    code: 'SKT',
    name: 'Sách tham khảo (viết lần đầu)',
    hours: 20,
    score: null,
    isDiscontinued: false,
    notes: ''
  },
  {
    id: 4,
    code: 'STH',
    name: 'Sách tình huống (viết lần đầu)',
    hours: 20,
    score: null,
    isDiscontinued: false,
    notes: ''
  },
  {
    id: 5,
    code: 'GTr',
    name: 'Giáo trình (viết lần đầu)',
    hours: 20,
    score: null,
    isDiscontinued: false,
    notes: ''
  }
];
