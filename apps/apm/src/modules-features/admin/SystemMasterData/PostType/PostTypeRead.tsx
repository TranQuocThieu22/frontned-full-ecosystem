'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Checkbox } from "@mantine/core";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PostTypeCreate from "./PostTypeCreate";
import PostTypeDelete from "./PostTypeDelete";
import PostTypeDeleteList from "./PostTypeDeleteList";
import PostTypeUpdate from "./PostTypeUpdate";
export interface PostType {
  id: number
  code: string;
  name: string;
  category: string;
  hours: number;
  score: number | null; // Assuming 'Số điểm' can be empty, hence null
  isDiscontinued: boolean;
  notes: string;
}
export default function PostTypeRead() {

  const columns = useMemo<MRT_ColumnDef<PostType>[]>(
    () => [
      {
        header: "Mã loại bài đăng",
        accessorKey: "code"
      },
      {
        header: "Tên loại bài đăng",
        accessorKey: "name"
      },
      {
        header: "Phân loại bài đăng",
        accessorKey: "category"
      },
      {
        header: "Số giờ",
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
    <MyFieldset title="Danh mục loại bài đăng kết quả nghiên cứu">
      <MyDataTable
        enableRowSelection
        columns={columns}
        data={mockData || []}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <PostTypeCreate />
              <MyButton crudType="import" />
              <MyButton crudType="export" />
              <PostTypeDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <PostTypeUpdate values={row.original} />
              <PostTypeDelete id={row.original.id || 0} code={row.original.code} />
            </MyCenterFull>
          )
        }}
      />
    </MyFieldset>
  )
}


const mockData: PostType[] = [
  {
    id: 1,
    code: 'TCQT-DMGS1.25',
    name: 'Tạp chí Quốc tế theo Danh mục HDGS - Điểm 1.25', // International Journal according to HDGS Catalog - Score 1.25
    category: 'Tạp chí', // Journal
    hours: 1200,
    score: null, // Empty in the image
    isDiscontinued: false, // Checkbox is unchecked
    notes: '' // Empty in the image
  },
  {
    id: 2,
    code: 'TCQT-DMGS1.0',
    name: 'Tạp chí Quốc tế theo Danh mục HDGS - Điểm 1.0', // International Journal according to HDGS Catalog - Score 1.0
    category: 'Kỷ yếu', // Proceedings
    hours: 1000,
    score: null, // Empty in the image
    isDiscontinued: false, // Checkbox is unchecked
    notes: '' // Empty in the image
  }
];
